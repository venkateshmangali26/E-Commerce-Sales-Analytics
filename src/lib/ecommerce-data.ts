// AUTO-GENERATED from Prisma database for Indian E-Commerce Market
// Synthetic e-commerce dataset: 2,000 transactions across 2023-01-01 .. 2025-12-31

export type Kpis = {
  total_sales: number;
  total_profit: number;
  total_orders: number;
  avg_order_value: number;
  avg_discount: number;
  profit_margin: number;
  total_shipping: number;
  unique_customers: number;
  negative_profit_orders: number;
  yearly: Record<number, { revenue: number; profit: number; orders: number }>;
};

export const kpis: Kpis = {
  "total_sales": 9831405.77,
  "total_profit": 2024504.27,
  "total_orders": 2000,
  "avg_order_value": 4915.7,
  "avg_discount": 8.91,
  "profit_margin": 20.59,
  "total_shipping": 149162.63,
  "unique_customers": 921,
  "negative_profit_orders": 49,
  "yearly": {
    "2022": {
      "revenue": 12669.99,
      "profit": 2946.62,
      "orders": 2
    },
    "2023": {
      "revenue": 3238001.65,
      "profit": 661312.31,
      "orders": 645
    },
    "2024": {
      "revenue": 3380516.38,
      "profit": 678246.88,
      "orders": 688
    },
    "2025": {
      "revenue": 3200217.75,
      "profit": 681998.46,
      "orders": 665
    }
  }
};

export const monthlyData = [
  {
    "year_month": "2022-12",
    "label": "Dec 2022",
    "revenue": 12669.99,
    "profit": 2946.62,
    "orders": 2
  },
  {
    "year_month": "2023-01",
    "label": "Jan 2023",
    "revenue": 235854.61,
    "profit": 44868.13,
    "orders": 43
  },
  {
    "year_month": "2023-02",
    "label": "Feb 2023",
    "revenue": 135472.86,
    "profit": 26964.6,
    "orders": 32
  },
  {
    "year_month": "2023-03",
    "label": "Mar 2023",
    "revenue": 211092.97,
    "profit": 45983.07,
    "orders": 50
  },
  {
    "year_month": "2023-04",
    "label": "Apr 2023",
    "revenue": 145302.56,
    "profit": 29006.05,
    "orders": 30
  },
  {
    "year_month": "2023-05",
    "label": "May 2023",
    "revenue": 228443.88,
    "profit": 45498.68,
    "orders": 49
  },
  {
    "year_month": "2023-06",
    "label": "Jun 2023",
    "revenue": 183687.31,
    "profit": 49514.54,
    "orders": 41
  },
  {
    "year_month": "2023-07",
    "label": "Jul 2023",
    "revenue": 290199.92,
    "profit": 59678.25,
    "orders": 48
  },
  {
    "year_month": "2023-08",
    "label": "Aug 2023",
    "revenue": 285628.62,
    "profit": 56334.79,
    "orders": 62
  },
  {
    "year_month": "2023-09",
    "label": "Sep 2023",
    "revenue": 466708.92,
    "profit": 102690.49,
    "orders": 77
  },
  {
    "year_month": "2023-10",
    "label": "Oct 2023",
    "revenue": 557555.39,
    "profit": 97837.71,
    "orders": 88
  },
  {
    "year_month": "2023-11",
    "label": "Nov 2023",
    "revenue": 281475.24,
    "profit": 54026.76,
    "orders": 64
  },
  {
    "year_month": "2023-12",
    "label": "Dec 2023",
    "revenue": 216579.37,
    "profit": 48909.24,
    "orders": 61
  },
  {
    "year_month": "2024-01",
    "label": "Jan 2024",
    "revenue": 250629.33,
    "profit": 60493.05,
    "orders": 60
  },
  {
    "year_month": "2024-02",
    "label": "Feb 2024",
    "revenue": 160814.93,
    "profit": 32461.11,
    "orders": 33
  },
  {
    "year_month": "2024-03",
    "label": "Mar 2024",
    "revenue": 285001.74,
    "profit": 49632.15,
    "orders": 45
  },
  {
    "year_month": "2024-04",
    "label": "Apr 2024",
    "revenue": 181605.65,
    "profit": 34440.36,
    "orders": 37
  },
  {
    "year_month": "2024-05",
    "label": "May 2024",
    "revenue": 266779.5,
    "profit": 43302.77,
    "orders": 57
  },
  {
    "year_month": "2024-06",
    "label": "Jun 2024",
    "revenue": 160493.75,
    "profit": 32517.93,
    "orders": 33
  },
  {
    "year_month": "2024-07",
    "label": "Jul 2024",
    "revenue": 178470.83,
    "profit": 30510.27,
    "orders": 49
  },
  {
    "year_month": "2024-08",
    "label": "Aug 2024",
    "revenue": 331223.2,
    "profit": 71548.72,
    "orders": 63
  },
  {
    "year_month": "2024-09",
    "label": "Sep 2024",
    "revenue": 344760.33,
    "profit": 77478.3,
    "orders": 75
  },
  {
    "year_month": "2024-10",
    "label": "Oct 2024",
    "revenue": 487212.05,
    "profit": 102177.6,
    "orders": 93
  },
  {
    "year_month": "2024-11",
    "label": "Nov 2024",
    "revenue": 508014.37,
    "profit": 93820.53,
    "orders": 84
  },
  {
    "year_month": "2024-12",
    "label": "Dec 2024",
    "revenue": 225510.7,
    "profit": 49864.09,
    "orders": 59
  },
  {
    "year_month": "2025-01",
    "label": "Jan 2025",
    "revenue": 224725.71,
    "profit": 49752.5,
    "orders": 59
  },
  {
    "year_month": "2025-02",
    "label": "Feb 2025",
    "revenue": 150477.91,
    "profit": 37344.94,
    "orders": 41
  },
  {
    "year_month": "2025-03",
    "label": "Mar 2025",
    "revenue": 321424.4,
    "profit": 66231.56,
    "orders": 47
  },
  {
    "year_month": "2025-04",
    "label": "Apr 2025",
    "revenue": 192428.72,
    "profit": 46034.37,
    "orders": 42
  },
  {
    "year_month": "2025-05",
    "label": "May 2025",
    "revenue": 253002.01,
    "profit": 52725.31,
    "orders": 53
  },
  {
    "year_month": "2025-06",
    "label": "Jun 2025",
    "revenue": 217797.74,
    "profit": 42563.66,
    "orders": 39
  },
  {
    "year_month": "2025-07",
    "label": "Jul 2025",
    "revenue": 195446.37,
    "profit": 44342.25,
    "orders": 47
  },
  {
    "year_month": "2025-08",
    "label": "Aug 2025",
    "revenue": 279404.67,
    "profit": 55896.09,
    "orders": 54
  },
  {
    "year_month": "2025-09",
    "label": "Sep 2025",
    "revenue": 278988.32,
    "profit": 61561.29,
    "orders": 55
  },
  {
    "year_month": "2025-10",
    "label": "Oct 2025",
    "revenue": 435282.2,
    "profit": 92193.97,
    "orders": 97
  },
  {
    "year_month": "2025-11",
    "label": "Nov 2025",
    "revenue": 401515.6,
    "profit": 84850.63,
    "orders": 78
  },
  {
    "year_month": "2025-12",
    "label": "Dec 2025",
    "revenue": 249724.1,
    "profit": 48501.89,
    "orders": 53
  }
];

export const yoyData = [
  {
    "year": 2022,
    "revenue": 12669.99,
    "profit": 2946.62,
    "orders": 2
  },
  {
    "year": 2023,
    "revenue": 3238001.65,
    "profit": 661312.31,
    "orders": 645
  },
  {
    "year": 2024,
    "revenue": 3380516.38,
    "profit": 678246.88,
    "orders": 688
  },
  {
    "year": 2025,
    "revenue": 3200217.75,
    "profit": 681998.46,
    "orders": 665
  }
];

export const heatmapData = [
  {
    "year": 2022,
    "quarter": "Q1",
    "revenue": 0
  },
  {
    "year": 2022,
    "quarter": "Q2",
    "revenue": 0
  },
  {
    "year": 2022,
    "quarter": "Q3",
    "revenue": 0
  },
  {
    "year": 2022,
    "quarter": "Q4",
    "revenue": 12669.99
  },
  {
    "year": 2023,
    "quarter": "Q1",
    "revenue": 582420.44
  },
  {
    "year": 2023,
    "quarter": "Q2",
    "revenue": 557433.75
  },
  {
    "year": 2023,
    "quarter": "Q3",
    "revenue": 1042537.46
  },
  {
    "year": 2023,
    "quarter": "Q4",
    "revenue": 1055610
  },
  {
    "year": 2024,
    "quarter": "Q1",
    "revenue": 696446
  },
  {
    "year": 2024,
    "quarter": "Q2",
    "revenue": 608878.9
  },
  {
    "year": 2024,
    "quarter": "Q3",
    "revenue": 854454.36
  },
  {
    "year": 2024,
    "quarter": "Q4",
    "revenue": 1220737.12
  },
  {
    "year": 2025,
    "quarter": "Q1",
    "revenue": 696628.02
  },
  {
    "year": 2025,
    "quarter": "Q2",
    "revenue": 663228.47
  },
  {
    "year": 2025,
    "quarter": "Q3",
    "revenue": 753839.36
  },
  {
    "year": 2025,
    "quarter": "Q4",
    "revenue": 1086521.9
  }
];

export const regionData = [
  {
    "region": "South India",
    "revenue": 3111641.14,
    "profit": 651690.96,
    "orders": 644,
    "avg_order": 4831.74,
    "avg_shipping": 62.74,
    "profit_margin": 20.9
  },
  {
    "region": "West India",
    "revenue": 2913051.49,
    "profit": 591221.37,
    "orders": 613,
    "avg_order": 4752.12,
    "avg_shipping": 72.52,
    "profit_margin": 20.3
  },
  {
    "region": "North India",
    "revenue": 2578731.61,
    "profit": 537965.95,
    "orders": 506,
    "avg_order": 5096.31,
    "avg_shipping": 78.03,
    "profit_margin": 20.9
  },
  {
    "region": "East India",
    "revenue": 769910.37,
    "profit": 164528.96,
    "orders": 155,
    "avg_order": 4967.16,
    "avg_shipping": 92.41,
    "profit_margin": 21.4
  },
  {
    "region": "Central & North East",
    "revenue": 458071.16,
    "profit": 79097.03,
    "orders": 82,
    "avg_order": 5586.23,
    "avg_shipping": 128.01,
    "profit_margin": 17.3
  }
];

export const countryData = [
  {
    "country": "Gujarat",
    "region": "West India",
    "revenue": 853275.64,
    "profit": 171720.67,
    "orders": 160
  },
  {
    "country": "Andhra Pradesh",
    "region": "South India",
    "revenue": 750983.86,
    "profit": 145858.23,
    "orders": 147
  },
  {
    "country": "Goa",
    "region": "West India",
    "revenue": 709952.4,
    "profit": 139301,
    "orders": 148
  },
  {
    "country": "Karnataka",
    "region": "South India",
    "revenue": 703082.78,
    "profit": 150496.23,
    "orders": 133
  },
  {
    "country": "Madhya Pradesh",
    "region": "West India",
    "revenue": 687260.76,
    "profit": 143325.35,
    "orders": 163
  },
  {
    "country": "Maharashtra",
    "region": "West India",
    "revenue": 662562.69,
    "profit": 136874.35,
    "orders": 142
  },
  {
    "country": "Kerala",
    "region": "South India",
    "revenue": 579807.85,
    "profit": 116092.59,
    "orders": 117
  },
  {
    "country": "Chandigarh",
    "region": "North India",
    "revenue": 560574.45,
    "profit": 116995.36,
    "orders": 92
  },
  {
    "country": "Telangana",
    "region": "South India",
    "revenue": 545068.39,
    "profit": 117466.5,
    "orders": 126
  },
  {
    "country": "Tamil Nadu",
    "region": "South India",
    "revenue": 532698.26,
    "profit": 121777.41,
    "orders": 121
  },
  {
    "country": "Rajasthan",
    "region": "North India",
    "revenue": 434844.33,
    "profit": 80552.3,
    "orders": 88
  },
  {
    "country": "Punjab",
    "region": "North India",
    "revenue": 434210.47,
    "profit": 95755.66,
    "orders": 83
  },
  {
    "country": "Haryana",
    "region": "North India",
    "revenue": 424133.47,
    "profit": 79456.9,
    "orders": 79
  },
  {
    "country": "Delhi NCR",
    "region": "North India",
    "revenue": 394479.82,
    "profit": 83449.47,
    "orders": 84
  },
  {
    "country": "Uttar Pradesh",
    "region": "North India",
    "revenue": 330489.07,
    "profit": 81756.26,
    "orders": 80
  },
  {
    "country": "Odisha",
    "region": "East India",
    "revenue": 219328.87,
    "profit": 49964.95,
    "orders": 43
  },
  {
    "country": "West Bengal",
    "region": "East India",
    "revenue": 200943.01,
    "profit": 47556.11,
    "orders": 40
  },
  {
    "country": "Jharkhand",
    "region": "East India",
    "revenue": 182903.58,
    "profit": 36384.49,
    "orders": 36
  },
  {
    "country": "Assam",
    "region": "Central & North East",
    "revenue": 171758.91,
    "profit": 27006.73,
    "orders": 30
  },
  {
    "country": "Bihar",
    "region": "East India",
    "revenue": 166734.91,
    "profit": 30623.41,
    "orders": 36
  },
  {
    "country": "Chhattisgarh",
    "region": "Central & North East",
    "revenue": 157036.3,
    "profit": 30165.63,
    "orders": 26
  },
  {
    "country": "Uttarakhand",
    "region": "Central & North East",
    "revenue": 129275.95,
    "profit": 21924.67,
    "orders": 26
  }
];

export const categoryData = [
  {
    "category": "Electronics",
    "revenue": 6037425.14,
    "profit": 826967.39,
    "share": 61.4,
    "orders": 772,
    "units": 1583,
    "avg_price": 4198.74,
    "avg_discount": 8.84,
    "profit_margin": 13.7
  },
  {
    "category": "Clothing",
    "revenue": 2309667.17,
    "profit": 790323.99,
    "share": 23.5,
    "orders": 578,
    "units": 1154,
    "avg_price": 2231.53,
    "avg_discount": 9.17,
    "profit_margin": 34.2
  },
  {
    "category": "Home & Kitchen",
    "revenue": 1269538.89,
    "profit": 316216.87,
    "share": 12.9,
    "orders": 394,
    "units": 757,
    "avg_price": 1833.26,
    "avg_discount": 8.95,
    "profit_margin": 24.9
  },
  {
    "category": "Books",
    "revenue": 214774.57,
    "profit": 90996.02,
    "share": 2.2,
    "orders": 256,
    "units": 504,
    "avg_price": 460.64,
    "avg_discount": 8.51,
    "profit_margin": 42.4
  }
];

export const topProductsData = [
  {
    "product": "realme Pad Mini 8.7 Tablet",
    "category": "Electronics",
    "revenue": 2391724.68,
    "profit": 352532.33,
    "units": 217,
    "orders": 107
  },
  {
    "product": "Fire-Boltt Stainless Smartwatch",
    "category": "Electronics",
    "revenue": 1038562.28,
    "profit": 148836.08,
    "units": 226,
    "orders": 113
  },
  {
    "product": "Noise ColorFit Pulse Smartwatch",
    "category": "Electronics",
    "revenue": 706161.23,
    "profit": 86766.8,
    "units": 224,
    "orders": 109
  },
  {
    "product": "OnePlus Nord Wireless Buds",
    "category": "Electronics",
    "revenue": 673635.45,
    "profit": 84855.67,
    "units": 248,
    "orders": 118
  },
  {
    "product": "Wildcraft Trekking Rucksack 45L",
    "category": "Clothing",
    "revenue": 479433.78,
    "profit": 171383.91,
    "units": 158,
    "orders": 81
  },
  {
    "product": "Prestige Deluxe Induction Cookware Set",
    "category": "Home & Kitchen",
    "revenue": 474509.89,
    "profit": 122446.09,
    "units": 150,
    "orders": 77
  },
  {
    "product": "boAt Airdopes Pro True Wireless",
    "category": "Electronics",
    "revenue": 449605.15,
    "profit": 55941.42,
    "units": 198,
    "orders": 102
  },
  {
    "product": "Mi Smart LED Desk Lamp 1S",
    "category": "Electronics",
    "revenue": 444504.69,
    "profit": 54911.26,
    "units": 257,
    "orders": 118
  },
  {
    "product": "Roadster Casual Denim Jacket",
    "category": "Clothing",
    "revenue": 436160.51,
    "profit": 146201.74,
    "units": 195,
    "orders": 98
  },
  {
    "product": "W for Woman Festive Anarkali Kurta",
    "category": "Clothing",
    "revenue": 364088.35,
    "profit": 119357.12,
    "units": 142,
    "orders": 80
  }
];

export const segmentData = [
  {
    "segment": "Consumer",
    "revenue": 5637148.4,
    "profit": 1262921.25,
    "share": 57.3,
    "orders": 1109,
    "avg_order_value": 5083.09,
    "avg_discount": 6.9,
    "profit_margin": 22.4
  },
  {
    "segment": "Corporate",
    "revenue": 2582242.24,
    "profit": 443071.46,
    "share": 26.3,
    "orders": 594,
    "avg_order_value": 4347.21,
    "avg_discount": 12.92,
    "profit_margin": 17.2
  },
  {
    "segment": "Home Office",
    "revenue": 1612015.13,
    "profit": 318511.56,
    "share": 16.4,
    "orders": 297,
    "avg_order_value": 5427.66,
    "avg_discount": 8.42,
    "profit_margin": 19.8
  }
];

export const segmentCategoryData = [
  {
    "segment": "Consumer",
    "values": {
      "Electronics": 3410864.88,
      "Home & Kitchen": 707956.7,
      "Books": 125380.23,
      "Clothing": 1392946.59
    }
  },
  {
    "segment": "Home Office",
    "values": {
      "Electronics": 1077610.54,
      "Home & Kitchen": 186152.66,
      "Books": 29665.1,
      "Clothing": 318586.83
    }
  },
  {
    "segment": "Corporate",
    "values": {
      "Electronics": 1548949.72,
      "Home & Kitchen": 375429.53,
      "Books": 59729.24,
      "Clothing": 598133.75
    }
  }
];

export const discountScatter = [
  {
    "discount": 13,
    "profit_margin": 25.7,
    "total_sales": 304.5,
    "category": "Books",
    "product": "Wings of Fire: APJ Abdul Kalam"
  },
  {
    "discount": 8.8,
    "profit_margin": 34.16,
    "total_sales": 3008.69,
    "category": "Clothing",
    "product": "Wildcraft Trekking Rucksack 45L"
  },
  {
    "discount": 8.5,
    "profit_margin": 25.56,
    "total_sales": 3201.59,
    "category": "Home & Kitchen",
    "product": "Prestige Deluxe Induction Cookware Set"
  },
  {
    "discount": 7.6,
    "profit_margin": 13.21,
    "total_sales": 2771.08,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 7.1,
    "profit_margin": 33.72,
    "total_sales": 1764.17,
    "category": "Clothing",
    "product": "FabIndia Handblock Cotton Kurta"
  },
  {
    "discount": 19.1,
    "profit_margin": 29.76,
    "total_sales": 343.83,
    "category": "Books",
    "product": "Rich Dad Poor Dad"
  },
  {
    "discount": 0,
    "profit_margin": 21.27,
    "total_sales": 8495,
    "category": "Electronics",
    "product": "Portronics SoundDrum Bluetooth Speaker"
  },
  {
    "discount": 2.9,
    "profit_margin": 38.68,
    "total_sales": 4853.06,
    "category": "Clothing",
    "product": "Roadster Casual Denim Jacket"
  },
  {
    "discount": 5.1,
    "profit_margin": 27.56,
    "total_sales": 3034.9,
    "category": "Home & Kitchen",
    "product": "Philips Ultrasonic Aroma Diffuser"
  },
  {
    "discount": 13.7,
    "profit_margin": 18.85,
    "total_sales": 302.05,
    "category": "Books",
    "product": "Wings of Fire: APJ Abdul Kalam"
  },
  {
    "discount": 14.5,
    "profit_margin": 19.01,
    "total_sales": 1965.65,
    "category": "Home & Kitchen",
    "product": "Spaces Ultra Soft Microfiber Blanket"
  },
  {
    "discount": 0,
    "profit_margin": 26.12,
    "total_sales": 1599,
    "category": "Home & Kitchen",
    "product": "Philips Ultrasonic Aroma Diffuser"
  },
  {
    "discount": 13.8,
    "profit_margin": 44.68,
    "total_sales": 2065.35,
    "category": "Books",
    "product": "The Lean Startup"
  },
  {
    "discount": 24.6,
    "profit_margin": 10.46,
    "total_sales": 2638.25,
    "category": "Home & Kitchen",
    "product": "Prestige Deluxe Induction Cookware Set"
  },
  {
    "discount": 14.5,
    "profit_margin": 8.12,
    "total_sales": 10259.15,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 6.7,
    "profit_margin": 35.78,
    "total_sales": 3543.53,
    "category": "Clothing",
    "product": "FabIndia Handblock Cotton Kurta"
  },
  {
    "discount": 8.8,
    "profit_margin": 14.3,
    "total_sales": 32829.26,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 11.8,
    "profit_margin": 9.55,
    "total_sales": 3086.12,
    "category": "Electronics",
    "product": "Noise ColorFit Pulse Smartwatch"
  },
  {
    "discount": 13.4,
    "profit_margin": 15.35,
    "total_sales": 1038.33,
    "category": "Home & Kitchen",
    "product": "Borosil Glass Storage Container Set"
  },
  {
    "discount": 5.9,
    "profit_margin": 28.38,
    "total_sales": 6018.64,
    "category": "Home & Kitchen",
    "product": "Philips Ultrasonic Aroma Diffuser"
  },
  {
    "discount": 0,
    "profit_margin": 30.24,
    "total_sales": 3596,
    "category": "Home & Kitchen",
    "product": "Milton Thermosteel Insulated Bottle"
  },
  {
    "discount": 8.4,
    "profit_margin": 13.42,
    "total_sales": 5218.45,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  },
  {
    "discount": 0.8,
    "profit_margin": 33.96,
    "total_sales": 1288.61,
    "category": "Clothing",
    "product": "Cultsport Active Yoga Leggings"
  },
  {
    "discount": 10.2,
    "profit_margin": 45.42,
    "total_sales": 1433.21,
    "category": "Books",
    "product": "The Psychology of Money"
  },
  {
    "discount": 7.3,
    "profit_margin": 35.75,
    "total_sales": 4076.95,
    "category": "Clothing",
    "product": "HRX Performance Running Shoes"
  },
  {
    "discount": 9.5,
    "profit_margin": 12.96,
    "total_sales": 6333.19,
    "category": "Electronics",
    "product": "Noise ColorFit Pulse Smartwatch"
  },
  {
    "discount": 10,
    "profit_margin": 33.74,
    "total_sales": 4498.2,
    "category": "Clothing",
    "product": "Roadster Casual Denim Jacket"
  },
  {
    "discount": 10.3,
    "profit_margin": 23.81,
    "total_sales": 3138.6,
    "category": "Home & Kitchen",
    "product": "Prestige Deluxe Induction Cookware Set"
  },
  {
    "discount": 8.8,
    "profit_margin": 35.74,
    "total_sales": 546.29,
    "category": "Books",
    "product": "The Lean Startup"
  },
  {
    "discount": 6.3,
    "profit_margin": 44.09,
    "total_sales": 747.73,
    "category": "Books",
    "product": "The Immortals of Meluha"
  },
  {
    "discount": 11.9,
    "profit_margin": 10,
    "total_sales": 5284.24,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 9.3,
    "profit_margin": 26.52,
    "total_sales": 1359.59,
    "category": "Clothing",
    "product": "Bombay Dyeing Linen Casual Shirt"
  },
  {
    "discount": 7.9,
    "profit_margin": 13.88,
    "total_sales": 4603.16,
    "category": "Electronics",
    "product": "boAt Airdopes Pro True Wireless"
  },
  {
    "discount": 18.9,
    "profit_margin": 17.95,
    "total_sales": 11350.76,
    "category": "Home & Kitchen",
    "product": "Prestige Deluxe Induction Cookware Set"
  },
  {
    "discount": 4.8,
    "profit_margin": 35.49,
    "total_sales": 3709.94,
    "category": "Clothing",
    "product": "Cultsport Active Yoga Leggings"
  },
  {
    "discount": 3,
    "profit_margin": 28.77,
    "total_sales": 2520.06,
    "category": "Home & Kitchen",
    "product": "Wakefit Orthopedic Memory Foam Pillow"
  },
  {
    "discount": 14.3,
    "profit_margin": 3.52,
    "total_sales": 1627.44,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  },
  {
    "discount": 10.1,
    "profit_margin": 23.69,
    "total_sales": 2155.8,
    "category": "Home & Kitchen",
    "product": "Borosil Glass Storage Container Set"
  },
  {
    "discount": 11.9,
    "profit_margin": 33.94,
    "total_sales": 484.55,
    "category": "Books",
    "product": "Sapiens: A Brief History"
  },
  {
    "discount": 2.5,
    "profit_margin": 37.59,
    "total_sales": 2436.53,
    "category": "Clothing",
    "product": "Roadster Casual Denim Jacket"
  },
  {
    "discount": 0,
    "profit_margin": 41.08,
    "total_sales": 8796,
    "category": "Clothing",
    "product": "HRX Performance Running Shoes"
  },
  {
    "discount": 17.9,
    "profit_margin": 28.16,
    "total_sales": 6153.4,
    "category": "Clothing",
    "product": "Bombay Dyeing Linen Casual Shirt"
  },
  {
    "discount": 13.5,
    "profit_margin": 31.01,
    "total_sales": 3889.91,
    "category": "Clothing",
    "product": "Bombay Dyeing Linen Casual Shirt"
  },
  {
    "discount": 12.8,
    "profit_margin": 10.13,
    "total_sales": 17436.51,
    "category": "Electronics",
    "product": "Fire-Boltt Stainless Smartwatch"
  },
  {
    "discount": 3.3,
    "profit_margin": 42.46,
    "total_sales": 771.67,
    "category": "Books",
    "product": "The Immortals of Meluha"
  },
  {
    "discount": 5.7,
    "profit_margin": 27.68,
    "total_sales": 2261.31,
    "category": "Home & Kitchen",
    "product": "Borosil Glass Storage Container Set"
  },
  {
    "discount": 5,
    "profit_margin": 16.38,
    "total_sales": 5698.1,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 17.6,
    "profit_margin": 4.73,
    "total_sales": 11532.7,
    "category": "Electronics",
    "product": "Noise ColorFit Pulse Smartwatch"
  },
  {
    "discount": 13.6,
    "profit_margin": 39.58,
    "total_sales": 862.27,
    "category": "Books",
    "product": "Atomic Habits (Hardcover)"
  },
  {
    "discount": 15.5,
    "profit_margin": 4.75,
    "total_sales": 2534.15,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 12.1,
    "profit_margin": 33,
    "total_sales": 8699.46,
    "category": "Clothing",
    "product": "Wildcraft Trekking Rucksack 45L"
  },
  {
    "discount": 10.1,
    "profit_margin": 12.52,
    "total_sales": 11233.01,
    "category": "Electronics",
    "product": "boAt Airdopes Pro True Wireless"
  },
  {
    "discount": 14.8,
    "profit_margin": 7.94,
    "total_sales": 12777.44,
    "category": "Electronics",
    "product": "Fire-Boltt Stainless Smartwatch"
  },
  {
    "discount": 11.2,
    "profit_margin": 12.01,
    "total_sales": 53275.56,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 1.5,
    "profit_margin": 16.8,
    "total_sales": 1870.52,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  },
  {
    "discount": 14.8,
    "profit_margin": 19.95,
    "total_sales": 2724.7,
    "category": "Home & Kitchen",
    "product": "Philips Ultrasonic Aroma Diffuser"
  },
  {
    "discount": 9.8,
    "profit_margin": 38.68,
    "total_sales": 719.8,
    "category": "Books",
    "product": "The Immortals of Meluha"
  },
  {
    "discount": 4.1,
    "profit_margin": 38.64,
    "total_sales": 6327.48,
    "category": "Clothing",
    "product": "Wildcraft Trekking Rucksack 45L"
  },
  {
    "discount": 14,
    "profit_margin": 35.67,
    "total_sales": 473,
    "category": "Books",
    "product": "Sapiens: A Brief History"
  },
  {
    "discount": 12.9,
    "profit_margin": 9.67,
    "total_sales": 8270.15,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  },
  {
    "discount": 6.8,
    "profit_margin": 16.1,
    "total_sales": 33549.2,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 13.1,
    "profit_margin": 28.61,
    "total_sales": 1910.93,
    "category": "Clothing",
    "product": "HRX Performance Running Shoes"
  },
  {
    "discount": 7.2,
    "profit_margin": 25.98,
    "total_sales": 2502.82,
    "category": "Home & Kitchen",
    "product": "Milton Thermosteel Insulated Bottle"
  },
  {
    "discount": 4.9,
    "profit_margin": 36.28,
    "total_sales": 2756.95,
    "category": "Clothing",
    "product": "W for Woman Festive Anarkali Kurta"
  },
  {
    "discount": 7.6,
    "profit_margin": 23.93,
    "total_sales": 1200.28,
    "category": "Home & Kitchen",
    "product": "Wakefit Orthopedic Memory Foam Pillow"
  },
  {
    "discount": 21.2,
    "profit_margin": 25.3,
    "total_sales": 5199.22,
    "category": "Clothing",
    "product": "Wildcraft Trekking Rucksack 45L"
  },
  {
    "discount": 9.9,
    "profit_margin": 36.38,
    "total_sales": 630.7,
    "category": "Books",
    "product": "Wings of Fire: APJ Abdul Kalam"
  },
  {
    "discount": 16.8,
    "profit_margin": 27.95,
    "total_sales": 2494.34,
    "category": "Clothing",
    "product": "Bombay Dyeing Linen Casual Shirt"
  },
  {
    "discount": 5.3,
    "profit_margin": 21.44,
    "total_sales": 1135.45,
    "category": "Home & Kitchen",
    "product": "Borosil Glass Storage Container Set"
  },
  {
    "discount": 0,
    "profit_margin": 19.49,
    "total_sales": 3499,
    "category": "Electronics",
    "product": "Noise ColorFit Pulse Smartwatch"
  },
  {
    "discount": 18.5,
    "profit_margin": 1.86,
    "total_sales": 2851.69,
    "category": "Electronics",
    "product": "Noise ColorFit Pulse Smartwatch"
  },
  {
    "discount": 12.5,
    "profit_margin": 31.76,
    "total_sales": 6559.88,
    "category": "Clothing",
    "product": "Roadster Casual Denim Jacket"
  },
  {
    "discount": 13.3,
    "profit_margin": 20.85,
    "total_sales": 2079.07,
    "category": "Home & Kitchen",
    "product": "Borosil Glass Storage Container Set"
  },
  {
    "discount": 5.9,
    "profit_margin": 34.05,
    "total_sales": 1410.56,
    "category": "Clothing",
    "product": "Bombay Dyeing Linen Casual Shirt"
  },
  {
    "discount": 19,
    "profit_margin": 2.92,
    "total_sales": 8502.57,
    "category": "Electronics",
    "product": "Noise ColorFit Pulse Smartwatch"
  },
  {
    "discount": 22.3,
    "profit_margin": -1.05,
    "total_sales": 9320.89,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 15,
    "profit_margin": 7.06,
    "total_sales": 6456.6,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  },
  {
    "discount": 14,
    "profit_margin": 7.69,
    "total_sales": 4298.28,
    "category": "Electronics",
    "product": "boAt Airdopes Pro True Wireless"
  },
  {
    "discount": 15,
    "profit_margin": 6.87,
    "total_sales": 10199.15,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 11,
    "profit_margin": 30.25,
    "total_sales": 1334.11,
    "category": "Clothing",
    "product": "Bombay Dyeing Linen Casual Shirt"
  },
  {
    "discount": 9.3,
    "profit_margin": 25.9,
    "total_sales": 6347.19,
    "category": "Home & Kitchen",
    "product": "Prestige Deluxe Induction Cookware Set"
  },
  {
    "discount": 10.9,
    "profit_margin": 11.95,
    "total_sales": 12470.44,
    "category": "Electronics",
    "product": "Noise ColorFit Pulse Smartwatch"
  },
  {
    "discount": 9.1,
    "profit_margin": 6.63,
    "total_sales": 1544.39,
    "category": "Electronics",
    "product": "Portronics SoundDrum Bluetooth Speaker"
  },
  {
    "discount": 20.9,
    "profit_margin": -2.5,
    "total_sales": 1343.91,
    "category": "Electronics",
    "product": "Portronics SoundDrum Bluetooth Speaker"
  },
  {
    "discount": 0,
    "profit_margin": 20.24,
    "total_sales": 5097,
    "category": "Electronics",
    "product": "Portronics SoundDrum Bluetooth Speaker"
  },
  {
    "discount": 10.6,
    "profit_margin": 10.83,
    "total_sales": 6790.82,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  },
  {
    "discount": 10.8,
    "profit_margin": 33.54,
    "total_sales": 5171.82,
    "category": "Clothing",
    "product": "W for Woman Festive Anarkali Kurta"
  },
  {
    "discount": 5.3,
    "profit_margin": 32.02,
    "total_sales": 377.85,
    "category": "Books",
    "product": "The Psychology of Money"
  },
  {
    "discount": 0,
    "profit_margin": 20.74,
    "total_sales": 5998,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 5.1,
    "profit_margin": 49.8,
    "total_sales": 2842.26,
    "category": "Books",
    "product": "The Lean Startup"
  },
  {
    "discount": 17.6,
    "profit_margin": 37.71,
    "total_sales": 987.15,
    "category": "Books",
    "product": "The Lean Startup"
  },
  {
    "discount": 3.4,
    "profit_margin": 17.37,
    "total_sales": 3668.87,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  },
  {
    "discount": 11.8,
    "profit_margin": 23,
    "total_sales": 3437.15,
    "category": "Home & Kitchen",
    "product": "Wakefit Orthopedic Memory Foam Pillow"
  },
  {
    "discount": 13.6,
    "profit_margin": 30.97,
    "total_sales": 3367.01,
    "category": "Clothing",
    "product": "Cultsport Active Yoga Leggings"
  },
  {
    "discount": 18.1,
    "profit_margin": 4.35,
    "total_sales": 19654.36,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 19.3,
    "profit_margin": 0.96,
    "total_sales": 4033.39,
    "category": "Electronics",
    "product": "boAt Airdopes Pro True Wireless"
  },
  {
    "discount": 0,
    "profit_margin": 18.39,
    "total_sales": 1699,
    "category": "Electronics",
    "product": "Portronics SoundDrum Bluetooth Speaker"
  },
  {
    "discount": 23.6,
    "profit_margin": 8.82,
    "total_sales": 420.2,
    "category": "Books",
    "product": "Sapiens: A Brief History"
  },
  {
    "discount": 8.7,
    "profit_margin": 14.03,
    "total_sales": 12778.35,
    "category": "Electronics",
    "product": "Noise ColorFit Pulse Smartwatch"
  },
  {
    "discount": 8.3,
    "profit_margin": 13.25,
    "total_sales": 4673.95,
    "category": "Electronics",
    "product": "Portronics SoundDrum Bluetooth Speaker"
  },
  {
    "discount": 23.9,
    "profit_margin": -4.28,
    "total_sales": 3878.82,
    "category": "Electronics",
    "product": "Portronics SoundDrum Bluetooth Speaker"
  },
  {
    "discount": 0,
    "profit_margin": 21.25,
    "total_sales": 11999,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 0,
    "profit_margin": 40.29,
    "total_sales": 4998,
    "category": "Clothing",
    "product": "Roadster Casual Denim Jacket"
  },
  {
    "discount": 14.8,
    "profit_margin": 8.21,
    "total_sales": 30669.44,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 0,
    "profit_margin": 27.76,
    "total_sales": 1199,
    "category": "Home & Kitchen",
    "product": "Borosil Glass Storage Container Set"
  },
  {
    "discount": 0,
    "profit_margin": 18.53,
    "total_sales": 3798,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  },
  {
    "discount": 0,
    "profit_margin": 21.49,
    "total_sales": 11999,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 3.2,
    "profit_margin": 39.16,
    "total_sales": 7257.1,
    "category": "Clothing",
    "product": "Roadster Casual Denim Jacket"
  },
  {
    "discount": 10.3,
    "profit_margin": 10.99,
    "total_sales": 3406.81,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  },
  {
    "discount": 15,
    "profit_margin": 19.58,
    "total_sales": 2718.3,
    "category": "Home & Kitchen",
    "product": "Philips Ultrasonic Aroma Diffuser"
  },
  {
    "discount": 23.3,
    "profit_margin": 16.3,
    "total_sales": 325.98,
    "category": "Books",
    "product": "Rich Dad Poor Dad"
  },
  {
    "discount": 18.1,
    "profit_margin": 18.98,
    "total_sales": 14328.41,
    "category": "Home & Kitchen",
    "product": "Prestige Deluxe Induction Cookware Set"
  },
  {
    "discount": 0.6,
    "profit_margin": 36.16,
    "total_sales": 1887.61,
    "category": "Clothing",
    "product": "FabIndia Handblock Cotton Kurta"
  },
  {
    "discount": 14.1,
    "profit_margin": 7.03,
    "total_sales": 6439.92,
    "category": "Electronics",
    "product": "boAt Airdopes Pro True Wireless"
  },
  {
    "discount": 13.5,
    "profit_margin": 8.44,
    "total_sales": 6053.27,
    "category": "Electronics",
    "product": "Noise ColorFit Pulse Smartwatch"
  },
  {
    "discount": 13.8,
    "profit_margin": 31.84,
    "total_sales": 9995.75,
    "category": "Clothing",
    "product": "W for Woman Festive Anarkali Kurta"
  },
  {
    "discount": 5.6,
    "profit_margin": 48.45,
    "total_sales": 1696.37,
    "category": "Books",
    "product": "The Lean Startup"
  },
  {
    "discount": 3.1,
    "profit_margin": 16.44,
    "total_sales": 1646.33,
    "category": "Electronics",
    "product": "Portronics SoundDrum Bluetooth Speaker"
  },
  {
    "discount": 9.2,
    "profit_margin": 34.96,
    "total_sales": 5897.46,
    "category": "Clothing",
    "product": "Cultsport Active Yoga Leggings"
  },
  {
    "discount": 16.2,
    "profit_margin": 30.02,
    "total_sales": 8376.65,
    "category": "Clothing",
    "product": "Roadster Casual Denim Jacket"
  },
  {
    "discount": 0,
    "profit_margin": 21.42,
    "total_sales": 11999,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 0,
    "profit_margin": 30.62,
    "total_sales": 1798,
    "category": "Home & Kitchen",
    "product": "Milton Thermosteel Insulated Bottle"
  },
  {
    "discount": 0,
    "profit_margin": 21.76,
    "total_sales": 35997,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 14.8,
    "profit_margin": 1.72,
    "total_sales": 298.2,
    "category": "Books",
    "product": "Wings of Fire: APJ Abdul Kalam"
  },
  {
    "discount": 14.4,
    "profit_margin": 17.48,
    "total_sales": 1368.74,
    "category": "Home & Kitchen",
    "product": "Philips Ultrasonic Aroma Diffuser"
  },
  {
    "discount": 2.2,
    "profit_margin": 30.57,
    "total_sales": 3127.64,
    "category": "Home & Kitchen",
    "product": "Philips Ultrasonic Aroma Diffuser"
  },
  {
    "discount": 0,
    "profit_margin": 21.13,
    "total_sales": 8997,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 19.3,
    "profit_margin": 1.2,
    "total_sales": 3064.99,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  },
  {
    "discount": 9.3,
    "profit_margin": 12.14,
    "total_sales": 4622.98,
    "category": "Electronics",
    "product": "Portronics SoundDrum Bluetooth Speaker"
  },
  {
    "discount": 11.1,
    "profit_margin": 33.67,
    "total_sales": 5154.42,
    "category": "Clothing",
    "product": "W for Woman Festive Anarkali Kurta"
  },
  {
    "discount": 0,
    "profit_margin": 39.28,
    "total_sales": 3299,
    "category": "Clothing",
    "product": "Wildcraft Trekking Rucksack 45L"
  },
  {
    "discount": 1.2,
    "profit_margin": 40.39,
    "total_sales": 7405.06,
    "category": "Clothing",
    "product": "Bombay Dyeing Linen Casual Shirt"
  },
  {
    "discount": 14.5,
    "profit_margin": 30.68,
    "total_sales": 4273.29,
    "category": "Clothing",
    "product": "Roadster Casual Denim Jacket"
  },
  {
    "discount": 8.8,
    "profit_margin": 35.53,
    "total_sales": 6017.38,
    "category": "Clothing",
    "product": "Wildcraft Trekking Rucksack 45L"
  },
  {
    "discount": 0,
    "profit_margin": 19.01,
    "total_sales": 2499,
    "category": "Electronics",
    "product": "boAt Airdopes Pro True Wireless"
  },
  {
    "discount": 0,
    "profit_margin": 51.9,
    "total_sales": 2200,
    "category": "Books",
    "product": "Sapiens: A Brief History"
  },
  {
    "discount": 0,
    "profit_margin": 32.06,
    "total_sales": 3499,
    "category": "Home & Kitchen",
    "product": "Prestige Deluxe Induction Cookware Set"
  },
  {
    "discount": 0,
    "profit_margin": 41.39,
    "total_sales": 9897,
    "category": "Clothing",
    "product": "Wildcraft Trekking Rucksack 45L"
  },
  {
    "discount": 14.5,
    "profit_margin": 39.16,
    "total_sales": 897.75,
    "category": "Books",
    "product": "Wings of Fire: APJ Abdul Kalam"
  },
  {
    "discount": 0,
    "profit_margin": 32.55,
    "total_sales": 6998,
    "category": "Home & Kitchen",
    "product": "Prestige Deluxe Induction Cookware Set"
  },
  {
    "discount": 0,
    "profit_margin": 49.06,
    "total_sales": 1197,
    "category": "Books",
    "product": "The Immortals of Meluha"
  },
  {
    "discount": 5.7,
    "profit_margin": 14.04,
    "total_sales": 2356.56,
    "category": "Electronics",
    "product": "boAt Airdopes Pro True Wireless"
  },
  {
    "discount": 9.9,
    "profit_margin": 34.93,
    "total_sales": 7836,
    "category": "Clothing",
    "product": "W for Woman Festive Anarkali Kurta"
  },
  {
    "discount": 10.4,
    "profit_margin": 32.64,
    "total_sales": 2686.21,
    "category": "Clothing",
    "product": "Bombay Dyeing Linen Casual Shirt"
  },
  {
    "discount": 21.4,
    "profit_margin": -1.74,
    "total_sales": 2670.83,
    "category": "Electronics",
    "product": "Portronics SoundDrum Bluetooth Speaker"
  },
  {
    "discount": 5.4,
    "profit_margin": 15.59,
    "total_sales": 2837.05,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 13.3,
    "profit_margin": 9.71,
    "total_sales": 20806.27,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 2.4,
    "profit_margin": 51.51,
    "total_sales": 2923.12,
    "category": "Books",
    "product": "The Lean Startup"
  },
  {
    "discount": 9.3,
    "profit_margin": 22.57,
    "total_sales": 1450.29,
    "category": "Home & Kitchen",
    "product": "Philips Ultrasonic Aroma Diffuser"
  },
  {
    "discount": 1.4,
    "profit_margin": 40.14,
    "total_sales": 7489.66,
    "category": "Clothing",
    "product": "FabIndia Handblock Cotton Kurta"
  },
  {
    "discount": 5.4,
    "profit_margin": 28.6,
    "total_sales": 3310.05,
    "category": "Home & Kitchen",
    "product": "Prestige Deluxe Induction Cookware Set"
  },
  {
    "discount": 3.9,
    "profit_margin": 16.75,
    "total_sales": 3649.88,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  },
  {
    "discount": 0,
    "profit_margin": 21.24,
    "total_sales": 9998,
    "category": "Electronics",
    "product": "Fire-Boltt Stainless Smartwatch"
  },
  {
    "discount": 2.4,
    "profit_margin": 19.62,
    "total_sales": 12195.12,
    "category": "Electronics",
    "product": "boAt Airdopes Pro True Wireless"
  },
  {
    "discount": 4.6,
    "profit_margin": 16.78,
    "total_sales": 4862.54,
    "category": "Electronics",
    "product": "Portronics SoundDrum Bluetooth Speaker"
  },
  {
    "discount": 9.3,
    "profit_margin": 24.15,
    "total_sales": 2356.39,
    "category": "Home & Kitchen",
    "product": "Wakefit Orthopedic Memory Foam Pillow"
  },
  {
    "discount": 17.6,
    "profit_margin": 28.07,
    "total_sales": 4118.35,
    "category": "Clothing",
    "product": "Roadster Casual Denim Jacket"
  },
  {
    "discount": 0,
    "profit_margin": 19.86,
    "total_sales": 3798,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  },
  {
    "discount": 12.2,
    "profit_margin": 10.61,
    "total_sales": 13167.37,
    "category": "Electronics",
    "product": "Fire-Boltt Stainless Smartwatch"
  },
  {
    "discount": 12.2,
    "profit_margin": 36.02,
    "total_sales": 746.3,
    "category": "Books",
    "product": "Rich Dad Poor Dad"
  },
  {
    "discount": 5.1,
    "profit_margin": 24.87,
    "total_sales": 1137.85,
    "category": "Home & Kitchen",
    "product": "Borosil Glass Storage Container Set"
  },
  {
    "discount": 2.5,
    "profit_margin": 34.29,
    "total_sales": 1266.53,
    "category": "Clothing",
    "product": "Cultsport Active Yoga Leggings"
  },
  {
    "discount": 12.2,
    "profit_margin": 10.88,
    "total_sales": 21070.24,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 0,
    "profit_margin": 21.53,
    "total_sales": 14997,
    "category": "Electronics",
    "product": "Fire-Boltt Stainless Smartwatch"
  },
  {
    "discount": 9.6,
    "profit_margin": 31.46,
    "total_sales": 2259.1,
    "category": "Clothing",
    "product": "Roadster Casual Denim Jacket"
  },
  {
    "discount": 4.8,
    "profit_margin": 37.88,
    "total_sales": 5519.7,
    "category": "Clothing",
    "product": "W for Woman Festive Anarkali Kurta"
  },
  {
    "discount": 12.7,
    "profit_margin": 7.65,
    "total_sales": 2181.63,
    "category": "Electronics",
    "product": "boAt Airdopes Pro True Wireless"
  },
  {
    "discount": 15.4,
    "profit_margin": 23.47,
    "total_sales": 359.55,
    "category": "Books",
    "product": "Rich Dad Poor Dad"
  },
  {
    "discount": 13.4,
    "profit_margin": 31.22,
    "total_sales": 4933.6,
    "category": "Clothing",
    "product": "FabIndia Handblock Cotton Kurta"
  },
  {
    "discount": 8.2,
    "profit_margin": 44.88,
    "total_sales": 1098.85,
    "category": "Books",
    "product": "The Psychology of Money"
  },
  {
    "discount": 18.2,
    "profit_margin": 2.21,
    "total_sales": 2862.18,
    "category": "Electronics",
    "product": "Noise ColorFit Pulse Smartwatch"
  },
  {
    "discount": 7.9,
    "profit_margin": 35.03,
    "total_sales": 4050.56,
    "category": "Clothing",
    "product": "HRX Performance Running Shoes"
  },
  {
    "discount": 7.5,
    "profit_margin": 18.34,
    "total_sales": 831.58,
    "category": "Home & Kitchen",
    "product": "Milton Thermosteel Insulated Bottle"
  },
  {
    "discount": 5.8,
    "profit_margin": 15.17,
    "total_sales": 3296.06,
    "category": "Electronics",
    "product": "Noise ColorFit Pulse Smartwatch"
  },
  {
    "discount": 0,
    "profit_margin": 41.06,
    "total_sales": 8796,
    "category": "Clothing",
    "product": "HRX Performance Running Shoes"
  },
  {
    "discount": 15.4,
    "profit_margin": 42.82,
    "total_sales": 1520.26,
    "category": "Books",
    "product": "The Lean Startup"
  },
  {
    "discount": 22.4,
    "profit_margin": -1.34,
    "total_sales": 9308.9,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 0,
    "profit_margin": 18.13,
    "total_sales": 1699,
    "category": "Electronics",
    "product": "Portronics SoundDrum Bluetooth Speaker"
  },
  {
    "discount": 5.5,
    "profit_margin": 28.71,
    "total_sales": 4345.11,
    "category": "Home & Kitchen",
    "product": "Spaces Ultra Soft Microfiber Blanket"
  },
  {
    "discount": 5.5,
    "profit_margin": 16.31,
    "total_sales": 4724.06,
    "category": "Electronics",
    "product": "Fire-Boltt Stainless Smartwatch"
  },
  {
    "discount": 10.1,
    "profit_margin": 11.39,
    "total_sales": 5392.2,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 7.2,
    "profit_margin": 11.49,
    "total_sales": 2783.07,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 6.5,
    "profit_margin": 36.31,
    "total_sales": 4112.13,
    "category": "Clothing",
    "product": "HRX Performance Running Shoes"
  },
  {
    "discount": 14.3,
    "profit_margin": 5.09,
    "total_sales": 2141.64,
    "category": "Electronics",
    "product": "boAt Airdopes Pro True Wireless"
  },
  {
    "discount": 17.9,
    "profit_margin": 17.45,
    "total_sales": 3938.34,
    "category": "Home & Kitchen",
    "product": "Philips Ultrasonic Aroma Diffuser"
  },
  {
    "discount": 0.7,
    "profit_margin": 32.38,
    "total_sales": 6449.54,
    "category": "Home & Kitchen",
    "product": "Wakefit Orthopedic Memory Foam Pillow"
  },
  {
    "discount": 0,
    "profit_margin": 20.79,
    "total_sales": 5998,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 11.3,
    "profit_margin": 22.33,
    "total_sales": 2304.43,
    "category": "Home & Kitchen",
    "product": "Wakefit Orthopedic Memory Foam Pillow"
  },
  {
    "discount": 12.6,
    "profit_margin": 22.24,
    "total_sales": 2795.05,
    "category": "Home & Kitchen",
    "product": "Philips Ultrasonic Aroma Diffuser"
  },
  {
    "discount": 23.8,
    "profit_margin": -3.06,
    "total_sales": 9143.24,
    "category": "Electronics",
    "product": "realme Pad Mini 8.7 Tablet"
  },
  {
    "discount": 6.2,
    "profit_margin": 37.25,
    "total_sales": 6188.92,
    "category": "Clothing",
    "product": "Wildcraft Trekking Rucksack 45L"
  },
  {
    "discount": 11,
    "profit_margin": 33.08,
    "total_sales": 3468.33,
    "category": "Clothing",
    "product": "Cultsport Active Yoga Leggings"
  },
  {
    "discount": 0,
    "profit_margin": 29.83,
    "total_sales": 3198,
    "category": "Home & Kitchen",
    "product": "Philips Ultrasonic Aroma Diffuser"
  },
  {
    "discount": 11.6,
    "profit_margin": 10.22,
    "total_sales": 4419.12,
    "category": "Electronics",
    "product": "Fire-Boltt Stainless Smartwatch"
  },
  {
    "discount": 20.3,
    "profit_margin": 6.56,
    "total_sales": 955.6,
    "category": "Home & Kitchen",
    "product": "Borosil Glass Storage Container Set"
  },
  {
    "discount": 3.3,
    "profit_margin": 16.06,
    "total_sales": 2900.03,
    "category": "Electronics",
    "product": "OnePlus Nord Wireless Buds"
  },
  {
    "discount": 14.1,
    "profit_margin": 31.34,
    "total_sales": 6439.92,
    "category": "Clothing",
    "product": "Roadster Casual Denim Jacket"
  },
  {
    "discount": 3.7,
    "profit_margin": 38.3,
    "total_sales": 5774.15,
    "category": "Clothing",
    "product": "Bombay Dyeing Linen Casual Shirt"
  },
  {
    "discount": 15,
    "profit_margin": 16.66,
    "total_sales": 2208.3,
    "category": "Home & Kitchen",
    "product": "Wakefit Orthopedic Memory Foam Pillow"
  },
  {
    "discount": 1.7,
    "profit_margin": 19.13,
    "total_sales": 3733.43,
    "category": "Electronics",
    "product": "Mi Smart LED Desk Lamp 1S"
  }
];

export const discountRangeData = [
  {
    "range": "No Discount",
    "orders": 312,
    "avg_revenue": 5755.31,
    "avg_profit": 1539.35,
    "avg_margin": 30.18
  },
  {
    "range": "1-10%",
    "orders": 816,
    "avg_revenue": 4942.36,
    "avg_profit": 1147.8,
    "avg_margin": 27.09
  },
  {
    "range": "11-20%",
    "orders": 745,
    "avg_revenue": 4787.91,
    "avg_profit": 768.18,
    "avg_margin": 19.71
  },
  {
    "range": "21-35%",
    "orders": 127,
    "avg_revenue": 3431.42,
    "avg_profit": 278.15,
    "avg_margin": 10.33
  }
];

export const paymentData = [
  {
    "method": "UPI",
    "orders": 1089,
    "revenue": 5373403.25,
    "share": 54.5,
    "avg_order": 4934.25
  },
  {
    "method": "Credit Card",
    "orders": 440,
    "revenue": 1972210.77,
    "share": 22,
    "avg_order": 4482.3
  },
  {
    "method": "Net Banking",
    "orders": 222,
    "revenue": 1206520.15,
    "share": 11.1,
    "avg_order": 5434.78
  },
  {
    "method": "Debit Card",
    "orders": 142,
    "revenue": 729166.92,
    "share": 7.1,
    "avg_order": 5134.98
  },
  {
    "method": "Cash on Delivery",
    "orders": 107,
    "revenue": 550104.68,
    "share": 5.4,
    "avg_order": 5141.17
  }
];

export const shippingData = [
  {
    "region": "South India",
    "avg_shipping": 62.74,
    "profit_margin": 20.9
  },
  {
    "region": "West India",
    "avg_shipping": 72.52,
    "profit_margin": 20.3
  },
  {
    "region": "North India",
    "avg_shipping": 78.03,
    "profit_margin": 20.9
  },
  {
    "region": "East India",
    "avg_shipping": 92.41,
    "profit_margin": 21.4
  },
  {
    "region": "Central & North East",
    "avg_shipping": 128.01,
    "profit_margin": 17.3
  }
];

export const correlationMatrix = [
  {
    "feature": "Quantity",
    "Quantity": 1,
    "Unit_Price": 0.01,
    "Discount_Percent": -0.02,
    "Total_Sales": 0.47,
    "Shipping_Cost": 0.01,
    "Profit": 0.53,
    "Profit_Margin": 0.12
  },
  {
    "feature": "Unit_Price",
    "Quantity": 0.01,
    "Unit_Price": 1,
    "Discount_Percent": -0.01,
    "Total_Sales": 0.77,
    "Shipping_Cost": 0.03,
    "Profit": 0.54,
    "Profit_Margin": -0.35
  },
  {
    "feature": "Discount_Percent",
    "Quantity": -0.02,
    "Unit_Price": -0.01,
    "Discount_Percent": 1,
    "Total_Sales": -0.07,
    "Shipping_Cost": -0.01,
    "Profit": -0.29,
    "Profit_Margin": -0.47
  },
  {
    "feature": "Total_Sales",
    "Quantity": 0.47,
    "Unit_Price": 0.77,
    "Discount_Percent": -0.07,
    "Total_Sales": 1,
    "Shipping_Cost": 0.03,
    "Profit": 0.83,
    "Profit_Margin": -0.21
  },
  {
    "feature": "Shipping_Cost",
    "Quantity": 0.01,
    "Unit_Price": 0.03,
    "Discount_Percent": -0.01,
    "Total_Sales": 0.03,
    "Shipping_Cost": 1,
    "Profit": 0,
    "Profit_Margin": -0.1
  },
  {
    "feature": "Profit",
    "Quantity": 0.53,
    "Unit_Price": 0.54,
    "Discount_Percent": -0.29,
    "Total_Sales": 0.83,
    "Shipping_Cost": 0,
    "Profit": 1,
    "Profit_Margin": 0.19
  },
  {
    "feature": "Profit_Margin",
    "Quantity": 0.12,
    "Unit_Price": -0.35,
    "Discount_Percent": -0.47,
    "Total_Sales": -0.21,
    "Shipping_Cost": -0.1,
    "Profit": 0.19,
    "Profit_Margin": 1
  }
];

export const correlationFeatures = [
  "Quantity",
  "Unit_Price",
  "Discount_Percent",
  "Total_Sales",
  "Shipping_Cost",
  "Profit",
  "Profit_Margin"
];

export const dowData = [
  {
    "day": "Monday",
    "orders": 279,
    "revenue": 1358340.07,
    "avg_revenue": 4868.6
  },
  {
    "day": "Tuesday",
    "orders": 282,
    "revenue": 1395485.45,
    "avg_revenue": 4948.53
  },
  {
    "day": "Wednesday",
    "orders": 307,
    "revenue": 1796263.32,
    "avg_revenue": 5851.02
  },
  {
    "day": "Thursday",
    "orders": 293,
    "revenue": 1388138.88,
    "avg_revenue": 4737.68
  },
  {
    "day": "Friday",
    "orders": 304,
    "revenue": 1305443.3,
    "avg_revenue": 4294.22
  },
  {
    "day": "Saturday",
    "orders": 284,
    "revenue": 1492670.61,
    "avg_revenue": 5255.88
  },
  {
    "day": "Sunday",
    "orders": 251,
    "revenue": 1095064.14,
    "avg_revenue": 4362.81
  }
];

export const recentOrders = [
  {
    "id": "ORD-20548",
    "date": "2025-12-27",
    "customer": "Sai Gupta",
    "country": "Bihar",
    "region": "East India",
    "product": "boAt Airdopes Pro True Wireless",
    "category": "Electronics",
    "quantity": 1,
    "total_sales": 2141.64,
    "profit": 109.02,
    "discount_percent": 14.3,
    "payment_method": "UPI",
    "customer_segment": "Consumer"
  },
  {
    "id": "ORD-20543",
    "date": "2025-12-27",
    "customer": "Sanjay Mishra",
    "country": "Uttarakhand",
    "region": "Central & North East",
    "product": "Mi Smart LED Desk Lamp 1S",
    "category": "Electronics",
    "quantity": 4,
    "total_sales": 6790.82,
    "profit": 735.37,
    "discount_percent": 10.6,
    "payment_method": "UPI",
    "customer_segment": "Corporate"
  },
  {
    "id": "ORD-20430",
    "date": "2025-12-27",
    "customer": "Sai Reddy",
    "country": "Maharashtra",
    "region": "West India",
    "product": "Noise ColorFit Pulse Smartwatch",
    "category": "Electronics",
    "quantity": 3,
    "total_sales": 9468.29,
    "profit": 1215.09,
    "discount_percent": 9.8,
    "payment_method": "Net Banking",
    "customer_segment": "Consumer"
  },
  {
    "id": "ORD-21705",
    "date": "2025-12-26",
    "customer": "Amit Mukherjee",
    "country": "Andhra Pradesh",
    "region": "South India",
    "product": "boAt Airdopes Pro True Wireless",
    "category": "Electronics",
    "quantity": 3,
    "total_sales": 6297.48,
    "profit": 397.68,
    "discount_percent": 16,
    "payment_method": "Net Banking",
    "customer_segment": "Corporate"
  },
  {
    "id": "ORD-21651",
    "date": "2025-12-26",
    "customer": "Sanvi Mishra",
    "country": "Gujarat",
    "region": "West India",
    "product": "Rich Dad Poor Dad",
    "category": "Books",
    "quantity": 2,
    "total_sales": 735.25,
    "profit": 268.11,
    "discount_percent": 13.5,
    "payment_method": "UPI",
    "customer_segment": "Corporate"
  },
  {
    "id": "ORD-20819",
    "date": "2025-12-26",
    "customer": "Suresh Kulkarni",
    "country": "Delhi NCR",
    "region": "North India",
    "product": "Wakefit Orthopedic Memory Foam Pillow",
    "category": "Home & Kitchen",
    "quantity": 1,
    "total_sales": 1261.33,
    "profit": 317.5,
    "discount_percent": 2.9,
    "payment_method": "Cash on Delivery",
    "customer_segment": "Consumer"
  },
  {
    "id": "ORD-20606",
    "date": "2025-12-24",
    "customer": "Reyansh Kulkarni",
    "country": "Kerala",
    "region": "South India",
    "product": "Wildcraft Trekking Rucksack 45L",
    "category": "Clothing",
    "quantity": 1,
    "total_sales": 2668.89,
    "profit": 694.87,
    "discount_percent": 19.1,
    "payment_method": "Credit Card",
    "customer_segment": "Home Office"
  },
  {
    "id": "ORD-20417",
    "date": "2025-12-24",
    "customer": "Arjun Mishra",
    "country": "Punjab",
    "region": "North India",
    "product": "HRX Performance Running Shoes",
    "category": "Clothing",
    "quantity": 2,
    "total_sales": 3518.4,
    "profit": 884.15,
    "discount_percent": 20,
    "payment_method": "UPI",
    "customer_segment": "Corporate"
  },
  {
    "id": "ORD-20194",
    "date": "2025-12-23",
    "customer": "Sunita Malhotra",
    "country": "Tamil Nadu",
    "region": "South India",
    "product": "boAt Airdopes Pro True Wireless",
    "category": "Electronics",
    "quantity": 1,
    "total_sales": 2499,
    "profit": 474.99,
    "discount_percent": 0,
    "payment_method": "Debit Card",
    "customer_segment": "Corporate"
  },
  {
    "id": "ORD-21942",
    "date": "2025-12-22",
    "customer": "Vihaan Verma",
    "country": "Goa",
    "region": "West India",
    "product": "Portronics SoundDrum Bluetooth Speaker",
    "category": "Electronics",
    "quantity": 2,
    "total_sales": 2647.04,
    "profit": -80.05,
    "discount_percent": 22.1,
    "payment_method": "UPI",
    "customer_segment": "Corporate"
  },
  {
    "id": "ORD-21458",
    "date": "2025-12-22",
    "customer": "Amit Malhotra",
    "country": "Telangana",
    "region": "South India",
    "product": "Wildcraft Trekking Rucksack 45L",
    "category": "Clothing",
    "quantity": 1,
    "total_sales": 2969.1,
    "profit": 988.23,
    "discount_percent": 10,
    "payment_method": "Cash on Delivery",
    "customer_segment": "Home Office"
  },
  {
    "id": "ORD-20277",
    "date": "2025-12-21",
    "customer": "Vikram Nambiar",
    "country": "Haryana",
    "region": "North India",
    "product": "boAt Airdopes Pro True Wireless",
    "category": "Electronics",
    "quantity": 1,
    "total_sales": 2014.19,
    "profit": -8.79,
    "discount_percent": 19.4,
    "payment_method": "Credit Card",
    "customer_segment": "Corporate"
  },
  {
    "id": "ORD-21442",
    "date": "2025-12-19",
    "customer": "Ishaan Bhat",
    "country": "Andhra Pradesh",
    "region": "South India",
    "product": "Spaces Ultra Soft Microfiber Blanket",
    "category": "Home & Kitchen",
    "quantity": 2,
    "total_sales": 3986.47,
    "profit": 892.24,
    "discount_percent": 13.3,
    "payment_method": "UPI",
    "customer_segment": "Consumer"
  },
  {
    "id": "ORD-20773",
    "date": "2025-12-19",
    "customer": "Riya Gupta",
    "country": "Kerala",
    "region": "South India",
    "product": "OnePlus Nord Wireless Buds",
    "category": "Electronics",
    "quantity": 1,
    "total_sales": 2819.06,
    "profit": 421.71,
    "discount_percent": 6,
    "payment_method": "Credit Card",
    "customer_segment": "Consumer"
  },
  {
    "id": "ORD-20584",
    "date": "2025-12-18",
    "customer": "Advik Kumar",
    "country": "West Bengal",
    "region": "East India",
    "product": "realme Pad Mini 8.7 Tablet",
    "category": "Electronics",
    "quantity": 1,
    "total_sales": 11999,
    "profit": 2549.6,
    "discount_percent": 0,
    "payment_method": "Cash on Delivery",
    "customer_segment": "Consumer"
  },
  {
    "id": "ORD-20074",
    "date": "2025-12-18",
    "customer": "Sneha Shah",
    "country": "Madhya Pradesh",
    "region": "West India",
    "product": "Cultsport Active Yoga Leggings",
    "category": "Clothing",
    "quantity": 4,
    "total_sales": 4047.68,
    "profit": 962.91,
    "discount_percent": 22.1,
    "payment_method": "Credit Card",
    "customer_segment": "Corporate"
  },
  {
    "id": "ORD-21052",
    "date": "2025-12-15",
    "customer": "Ishaan Sharma",
    "country": "Gujarat",
    "region": "West India",
    "product": "Philips Ultrasonic Aroma Diffuser",
    "category": "Home & Kitchen",
    "quantity": 2,
    "total_sales": 2795.05,
    "profit": 621.49,
    "discount_percent": 12.6,
    "payment_method": "UPI",
    "customer_segment": "Consumer"
  },
  {
    "id": "ORD-20373",
    "date": "2025-12-15",
    "customer": "Vivaan Chawla",
    "country": "Delhi NCR",
    "region": "North India",
    "product": "Wildcraft Trekking Rucksack 45L",
    "category": "Clothing",
    "quantity": 2,
    "total_sales": 5317.99,
    "profit": 1414.52,
    "discount_percent": 19.4,
    "payment_method": "Credit Card",
    "customer_segment": "Corporate"
  },
  {
    "id": "ORD-20926",
    "date": "2025-12-14",
    "customer": "Advik Mishra",
    "country": "Rajasthan",
    "region": "North India",
    "product": "Portronics SoundDrum Bluetooth Speaker",
    "category": "Electronics",
    "quantity": 3,
    "total_sales": 4673.95,
    "profit": 619.07,
    "discount_percent": 8.3,
    "payment_method": "UPI",
    "customer_segment": "Corporate"
  },
  {
    "id": "ORD-21933",
    "date": "2025-12-13",
    "customer": "Sai Reddy",
    "country": "Madhya Pradesh",
    "region": "West India",
    "product": "Bombay Dyeing Linen Casual Shirt",
    "category": "Clothing",
    "quantity": 3,
    "total_sales": 4114.76,
    "profit": 1424.42,
    "discount_percent": 8.5,
    "payment_method": "UPI",
    "customer_segment": "Consumer"
  },
  {
    "id": "ORD-21988",
    "date": "2025-12-12",
    "customer": "Advik Patil",
    "country": "Andhra Pradesh",
    "region": "South India",
    "product": "Cultsport Active Yoga Leggings",
    "category": "Clothing",
    "quantity": 5,
    "total_sales": 6404.07,
    "profit": 2569.19,
    "discount_percent": 1.4,
    "payment_method": "Net Banking",
    "customer_segment": "Consumer"
  },
  {
    "id": "ORD-20696",
    "date": "2025-12-12",
    "customer": "Venkatesh Verma",
    "country": "Haryana",
    "region": "North India",
    "product": "Bombay Dyeing Linen Casual Shirt",
    "category": "Clothing",
    "quantity": 2,
    "total_sales": 2632.24,
    "profit": 805.59,
    "discount_percent": 12.2,
    "payment_method": "UPI",
    "customer_segment": "Corporate"
  },
  {
    "id": "ORD-20348",
    "date": "2025-12-12",
    "customer": "Pooja Singh",
    "country": "Kerala",
    "region": "South India",
    "product": "Prestige Deluxe Induction Cookware Set",
    "category": "Home & Kitchen",
    "quantity": 1,
    "total_sales": 3310.05,
    "profit": 946.58,
    "discount_percent": 5.4,
    "payment_method": "Credit Card",
    "customer_segment": "Consumer"
  },
  {
    "id": "ORD-21413",
    "date": "2025-12-11",
    "customer": "Sneha Chatterjee",
    "country": "Haryana",
    "region": "North India",
    "product": "realme Pad Mini 8.7 Tablet",
    "category": "Electronics",
    "quantity": 4,
    "total_sales": 41708.52,
    "profit": 4185.86,
    "discount_percent": 13.1,
    "payment_method": "Net Banking",
    "customer_segment": "Home Office"
  },
  {
    "id": "ORD-20777",
    "date": "2025-12-11",
    "customer": "Aryan Das",
    "country": "Chhattisgarh",
    "region": "Central & North East",
    "product": "OnePlus Nord Wireless Buds",
    "category": "Electronics",
    "quantity": 1,
    "total_sales": 2783.07,
    "profit": 319.88,
    "discount_percent": 7.2,
    "payment_method": "Net Banking",
    "customer_segment": "Corporate"
  }
];

export const categoryList = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books"
];

export const segmentList = [
  "Consumer",
  "Corporate",
  "Home Office"
];

export const regionList = [
  "South India",
  "West India",
  "North India",
  "East India",
  "Central & North East"
];

// Formatters for Indian Rupee (₹) and Indian Numbering System
export const formatCurrency = (value: number, compact = false) => {
  if (compact) {
    const abs = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    if (abs >= 10000000) return `${sign}₹${(abs / 10000000).toFixed(2)} Cr`;
    if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(1)} L`;
    if (abs >= 1000) return `${sign}₹${(abs / 1000).toFixed(1)} K`;
    return `${sign}₹${abs.toFixed(0)}`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number, compact = false) => {
  if (compact) {
    const abs = Math.abs(value);
    const sign = value < 0 ? "-" : "";
    if (abs >= 10000000) return `${sign}${(abs / 10000000).toFixed(2)} Cr`;
    if (abs >= 100000) return `${sign}${(abs / 100000).toFixed(1)} L`;
    if (abs >= 1000) return `${sign}${(abs / 1000).toFixed(1)} K`;
    return `${sign}${abs.toFixed(0)}`;
  }
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 1,
  }).format(value);
};

export const calcChange = (current: number, previous: number) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};
