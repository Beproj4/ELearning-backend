"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLast12MothsData = void 0;
// array of objects containing month-wise document counts
async function generateLast12MothsData(model) {
    const last12Months = [];
    const currentDate = new Date(); // 10th feb 2024 saturdau
    currentDate.setDate(currentDate.getDate() + 1); // 11th feb 2024 sunday = currentDate
    // assume each month has 28 days
    for (let i = 11; i >= 0; i--) {
        const endDate = new Date(currentDate.getFullYear(), // 2024
        currentDate.getMonth(), // feb = 2
        currentDate.getDate() - i * 28);
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 28);
        const monthYear = endDate.toLocaleString("default", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        const count = await model.countDocuments({
            createdAt: {
                $gte: startDate,
                $lt: endDate,
            },
        });
        last12Months.push({ month: monthYear, count });
    }
    return { last12Months };
}
exports.generateLast12MothsData = generateLast12MothsData;
