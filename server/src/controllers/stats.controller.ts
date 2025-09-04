import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { IOrder, Order } from "../models/order.models.js";
import { IUser, User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";
import { getInventory, increment } from "../utils/features.js";

type RevenueAgg = {
    _id: string
    total: number
}

type OrderCountConfig = {
    _id: string,
    count: number
}

export const Dashboard = asyncHandler(async (req: Request, res: Response) => {
    const id = req.user?._id;
    const today = new Date();
    const sixMonths = new Date()
    sixMonths.setMonth(sixMonths.getMonth() - 6)
    const thisMonth = {
        start: new Date(today.getFullYear(), today.getMonth(), 1),
        end: today,
    };

    const lastMonth = {
        start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        end: new Date(today.getFullYear(), today.getMonth(), 0),
    };

    // Queries
    const promises = [
        // Product counts
        Product.countDocuments({ owner: id, createdAt: { $gte: thisMonth.start, $lte: thisMonth.end } }),
        Product.countDocuments({ owner: id, createdAt: { $gte: lastMonth.start, $lte: lastMonth.end } }),
        Product.distinct("category"),


        // User counts
        User.countDocuments({ createdAt: { $gte: thisMonth.start, $lte: thisMonth.end } }),
        User.countDocuments({ createdAt: { $gte: lastMonth.start, $lte: lastMonth.end } }),
        User.countDocuments({ gender: "male" }),
        User.countDocuments({ gender: "female" }),

        // Order counts
        Order.countDocuments({ createdAt: { $gte: thisMonth.start, $lte: thisMonth.end } }),
        Order.countDocuments({ createdAt: { $gte: lastMonth.start, $lte: lastMonth.end } }),

        // Revenue aggregation
        Order.aggregate<RevenueAgg>([
            { $match: { createdAt: { $gte: thisMonth.start, $lte: thisMonth.end } } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } },
        ]),
        Order.aggregate<RevenueAgg>([
            { $match: { createdAt: { $gte: lastMonth.start, $lte: lastMonth.end } } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } },
        ]),
        Order.aggregate<RevenueAgg>([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(today.getFullYear(), today.getMonth() - 5, 1),
                        $lte: today,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    total: { $sum: "$totalPrice" },
                },
            },
            {
                $project: {
                    _id: {
                        $concat: [
                            { $toString: "$_id.year" },
                            "-",
                            {
                                $cond: [
                                    { $lt: ["$_id.month", 10] },
                                    { $concat: ["0", { $toString: "$_id.month" }] },
                                    { $toString: "$_id.month" },
                                ],
                            },
                        ],
                    },
                    total: 1,
                },
            },
            { $sort: { _id: 1 } },
        ])
        ,
        Order.aggregate<OrderCountConfig>([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(today.getFullYear(), today.getMonth() - 5, 1),
                        $lte: today,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: {
                        $concat: [
                            { $toString: "$_id.year" },
                            "-",
                            {
                                $cond: [
                                    { $lt: ["$_id.month", 10] },
                                    { $concat: ["0", { $toString: "$_id.month" }] },
                                    { $toString: "$_id.month" },
                                ],
                            },
                        ],
                    },
                    count: 1,
                },
            },
            { $sort: { _id: 1 } },
        ]),
        Order.find({}).limit(4).select(["orderItem", "discount", "totalPrice", "orderStatus"])
    ];

    const [
        thisMonthProductCount,
        lastMonthProductCount,
        productCategories,

        thisMonthUserCount,
        lastMonthUserCount,
        maleUsersCount,
        femaleUserCount,

        thisMonthOrderCount,
        lastMonthOrderCount,
        thisMonthRevenueAgg,
        lastMonthRevenueAgg,
        lastSixMonthRevenue,
        lastSixMonthOrders,
        latestTransactions
    ] = await Promise.all(promises) as [
        number, number, [string], number, number, number, number, number, number,
        RevenueAgg[], RevenueAgg[], RevenueAgg[], OrderCountConfig[], [IOrder]
    ]


    const sixMonthsList = new Date();
    const months: string[] = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(sixMonthsList.getFullYear(), sixMonthsList.getMonth() - (4 - i), 1);
        return d.toISOString().slice(0, 7); // "YYYY-MM"
    });

    // Map results by month for quick lookup
    const orderMap = new Map(lastSixMonthOrders.map(o => [o._id, o.count]));
    const revenueMap = new Map(lastSixMonthRevenue.map(r => [r._id, r.total]));

    const sixMonthTransaction = months.map(m => orderMap.get(m) ?? 0);
    const sixMonthRevenue = months.map(m => revenueMap.get(m) ?? 0);


    const thisMonthRevenue = thisMonthRevenueAgg[0]?.total ?? 0;
    const lastMonthRevenue = lastMonthRevenueAgg[0]?.total ?? 0;

    const categories = await getInventory(productCategories)

    const modifiedLatestTransactions = latestTransactions.map(l => ({
        _id: l._id,
        orderItems: l.orderItem?.length | 0,
        status: l.orderStatus,
        discount: l.discount,
        total: l.totalPrice,
    }))

    const stats = {
        ratio: {
            male: maleUsersCount,
            female: femaleUserCount
        },
        modifiedLatestTransactions,
        categories,
        growth: {
            products: increment(thisMonthProductCount, lastMonthProductCount),
            orders: increment(thisMonthOrderCount, lastMonthOrderCount),
            users: increment(thisMonthUserCount, lastMonthUserCount),
            revenue: increment(thisMonthRevenue, lastMonthRevenue),
        },
        count: {
            products: thisMonthProductCount,
            orders: thisMonthOrderCount,
            users: thisMonthUserCount,
        },
        charts: {
            order: sixMonthTransaction,
            revenue: sixMonthRevenue,
        }
    };

    return res
        .status(200)
        .json(new ApiResponse(200, stats, "Dashboard data successfully fetched"));
});

export const getPieCharts = asyncHandler(async (req: Request, res: Response) => {
    const id = req?.user?._id;

    const promises = [
        // Orders count
        Order.countDocuments({ orderStatus: "Processing" }),
        Order.countDocuments({ orderStatus: "Shipped" }),
        Order.countDocuments({ orderStatus: "Delivered" }),
        Order.countDocuments({ orderStatus: "Canceled" }),
        Order.find({}).select([
            "discount",
            "taxPrice",
            "shippingCharge",
            "subTotal",
            "totalPrice"
        ]),

        // Product category count
        Product.distinct("category"),
        Product.countDocuments({}),
        Product.countDocuments({ stock: 0 }),

        // Users age and role distribution
        // User.countDocuments({ age: { $gte: 13, $lte: 19 } }),
        // User.countDocuments({ age: { $gte: 20, $lte: 39 } }),
        // User.countDocuments({ age: { $gte: 40 } }),
        User.find({}).select("dob"),
        User.countDocuments({ role: "admin" }),
        User.countDocuments({ role: "user" }),
    ]
    const [
        processingOrderCount,
        shippedOrderCount,
        deliveredOrderCount,
        canceledOrderCount,
        orders,

        productCategories,
        productCount,
        outOfStockCount,

        users,
        adminCount,
        customerCount,

    ] = await Promise.all(promises) as [
        number, number, number, number, any, [string], number,
        number, IUser[], number, number
    ]


    const grossIncome = orders.reduce((acc: number, order: any) =>
        acc + (order.totalPrice | 0), 0
    )

    const discount = orders.reduce((acc: number, order: any) =>
        acc + (order.discount | 0), 0
    )

    const productionCost = orders.reduce((acc: number, order: any) =>
        acc + (order.shippingCharge | 0), 0
    )

    const burnt = orders.reduce((acc: number, order: any) =>
        acc + (order.taxPrice | 0), 0
    )
    const MARKETING_COST = Number(process.env.MARKETING_COST)
    const marketingCost = Math.round(grossIncome * (MARKETING_COST / 100));
    const netMargin = grossIncome - discount - productionCost - burnt - marketingCost;

    const revenueDistribution = {
        netMargin,
        discount,
        productionCost,
        burnt,
        marketingCost,
    }
    const categories = await getInventory(productCategories)

    const stockAvailability = {
        inStock: productCount - outOfStockCount,
        outStock: outOfStockCount
    }

    let teenagersCount = 0, adultCount = 0, oldCount = 0;

    users.forEach((u) => {
        if (u.age <= 19) {
            ++teenagersCount
        } else if (u.age >= 20 && u.age <= 40) {
            ++adultCount
        } else {
            ++oldCount
        }
    })

    const charts = {
        userRoleDistribution: {
            admins: adminCount,
            customers: customerCount
        },
        userAgeDistribution: {
            teenagers: teenagersCount,
            adults: adultCount,
            olds: oldCount,
        },
        revenueDistribution,
        stockAvailability,
        categories,
        ordersFulfillment: {
            processing: processingOrderCount,
            shipping: shippedOrderCount,
            delivered: deliveredOrderCount,
            canceled: canceledOrderCount,
        }
    }

    return res.status(200).json(
        new ApiResponse(200, charts, "Pie charts successfully fetched")
    )
})
export const getLineCharts = asyncHandler(async (req: Request, res: Response) => {

})
export const getBarCharts = asyncHandler(async (req: Request, res: Response) => {

})
