"""
Generate a realistic e-commerce dataset matching the schema of the uploaded
notebook (global_e-commerce_sales.csv) and pre-aggregate every chart dataset
the front-end needs. Output: a single TypeScript file at
/home/z/my-project/src/lib/ecommerce-data.ts
"""
import json
import random
import os
from collections import defaultdict
from datetime import date, timedelta

random.seed(42)

# ---------- Reference catalogs (mirror notebook) ----------
COUNTRIES = {
    "South India": ["Karnataka", "Tamil Nadu", "Telangana", "Kerala", "Andhra Pradesh"],
    "West India": ["Maharashtra", "Gujarat", "Madhya Pradesh", "Goa"],
    "North India": ["Delhi NCR", "Uttar Pradesh", "Punjab", "Haryana", "Rajasthan", "Chandigarh"],
    "East India": ["West Bengal", "Odisha", "Bihar", "Jharkhand"],
    "Central & North East": ["Assam", "Chhattisgarh", "Uttarakhand"],
}
REGIONS = list(COUNTRIES.keys())

PRODUCT_CATEGORIES = {
    "Electronics": [
        ("boAt Airdopes Pro True Wireless", 2499.00),
        ("Noise ColorFit Pulse Smartwatch", 3499.00),
        ("OnePlus Nord Wireless Buds", 2999.00),
        ("Fire-Boltt Stainless Smartwatch", 4999.00),
        ("Mi Smart LED Desk Lamp 1S", 1899.00),
        ("realme Pad Mini 8.7 Tablet", 11999.00),
        ("Portronics SoundDrum Bluetooth Speaker", 1699.00),
    ],
    "Clothing": [
        ("FabIndia Handblock Cotton Kurta", 1899.00),
        ("Roadster Casual Denim Jacket", 2499.00),
        ("Wildcraft Trekking Rucksack 45L", 3299.00),
        ("HRX Performance Running Shoes", 2199.00),
        ("W for Woman Festive Anarkali Kurta", 2899.00),
        ("Bombay Dyeing Linen Casual Shirt", 1499.00),
        ("Cultsport Active Yoga Leggings", 1299.00),
    ],
    "Home & Kitchen": [
        ("Prestige Deluxe Induction Cookware Set", 3499.00),
        ("Milton Thermosteel Insulated Bottle", 899.00),
        ("Wakefit Orthopedic Memory Foam Pillow", 1299.00),
        ("Philips Ultrasonic Aroma Diffuser", 1599.00),
        ("Borosil Glass Storage Container Set", 1199.00),
        ("Spaces Ultra Soft Microfiber Blanket", 2299.00),
    ],
    "Books": [
        ("Atomic Habits (Hardcover)", 499.00),
        ("The Psychology of Money", 399.00),
        ("Sapiens: A Brief History", 550.00),
        ("Wings of Fire: APJ Abdul Kalam", 350.00),
        ("The Immortals of Meluha", 399.00),
        ("Rich Dad Poor Dad", 425.00),
        ("The Lean Startup", 599.00),
    ],
}
CATEGORIES = list(PRODUCT_CATEGORIES.keys())

CUSTOMER_SEGMENTS = ["Consumer", "Corporate", "Home Office"]

PAYMENT_METHODS = ["UPI", "Credit Card", "Net Banking", "Debit Card", "Cash on Delivery"]

FIRST_NAMES = [
    "Aarav", "Vihaan", "Vivaan", "Ananya", "Diya", "Advik", "Kabir", "Ishaan", "Sai", "Arjun",
    "Reyansh", "Aryan", "Aditi", "Anaya", "Sanvi", "Mira", "Riya", "Priya", "Rohan", "Rahul",
    "Vikram", "Pooja", "Sneha", "Neha", "Amit", "Rajesh", "Sunita", "Suresh", "Manoj", "Deepika",
    "Lakshmi", "Karthik", "Venkatesh", "Harish", "Sanjay", "Anjali",
]
LAST_NAMES = [
    "Sharma", "Verma", "Gupta", "Patel", "Reddy", "Kumar", "Singh", "Iyer", "Nair", "Rao",
    "Joshi", "Kulkarni", "Mehta", "Shah", "Das", "Mukherjee", "Chatterjee", "Banerjee", "Bose",
    "Agarwal", "Mishra", "Bhat", "Pillai", "Deshmukh", "Patil", "Chawla", "Malhotra", "Kapoor",
    "Nambiar", "Hegde",
]


def gen_customer():
    return f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"


# ---------- Generate 2000 transactions across 2023-01-01 .. 2025-12-31 ----------
START = date(2023, 1, 1)
END = date(2025, 12, 31)
DAYS_RANGE = (END - START).days
N_TXNS = 2000

# Seasonality multipliers (month -> demand weight), Festive peaks in India (Navratri, Diwali, Republic Day)
MONTH_WEIGHTS = [1.15, 0.90, 0.95, 0.90, 1.00, 0.95, 1.05, 1.25, 1.45, 1.85, 1.60, 1.30]

# Region -> base shipping cost (in INR ₹)
REGION_SHIP_BASE = {
    "South India": 60.00,
    "West India": 70.00,
    "North India": 75.00,
    "East India": 90.00,
    "Central & North East": 125.00,
}

# Category -> base margin before discount
CATEGORY_MARGIN = {
    "Electronics": 0.22,
    "Clothing": 0.42,
    "Home & Kitchen": 0.34,
    "Books": 0.55,
}

# Segment -> discount propensity
SEGMENT_DISCOUNT = {
    "Consumer": (0, 15),
    "Corporate": (5, 25),
    "Home Office": (0, 20),
}


def generate_transactions():
    rows = []
    for i in range(N_TXNS):
        # Bias month selection toward Q4 (Oct-Dec peaks)
        month = random.choices(range(1, 13), weights=MONTH_WEIGHTS)[0]
        year = random.choice([2023, 2024, 2025])
        day = random.randint(1, 28)
        order_date = date(year, month, day)

        region = random.choices(REGIONS, weights=[34, 28, 22, 9, 7])[0]
        country = random.choice(COUNTRIES[region])
        category = random.choices(CATEGORIES, weights=[40, 28, 20, 12])[0]
        product_name, unit_price = random.choice(PRODUCT_CATEGORIES[category])
        quantity = random.choices([1, 2, 3, 4, 5], weights=[45, 28, 14, 8, 5])[0]
        segment = random.choices(CUSTOMER_SEGMENTS, weights=[55, 30, 15])[0]

        # Discount
        d_lo, d_hi = SEGMENT_DISCOUNT[segment]
        # Higher priced items more likely to have discount
        if unit_price > 200:
            d_lo += 2
        discount_percent = round(random.uniform(d_lo, d_hi), 1) if random.random() > 0.15 else 0.0

        gross = unit_price * quantity
        discount_amount = gross * (discount_percent / 100)
        total_sales = round(gross - discount_amount, 2)

        # Profit based on category margin, reduced by discount, plus shipping cost
        base_margin = CATEGORY_MARGIN[category]
        shipping_cost = round(REGION_SHIP_BASE[region] + random.uniform(-3, 5), 2)
        # Profit = (base_margin * gross) - discount_amount - shipping_cost
        profit = round((base_margin * gross) - discount_amount - shipping_cost, 2)

        payment = random.choices(PAYMENT_METHODS, weights=[55, 25, 12, 8])[0]
        customer = gen_customer()

        order_id = f"ORD-{(year-2000)*10000 + i:05d}"

        rows.append({
            "Order_ID": order_id,
            "Order_Date": order_date.isoformat(),
            "Customer_Name": customer,
            "Customer_Segment": segment,
            "Country": country,
            "Region": region,
            "Product_Category": category,
            "Product_Name": product_name,
            "Quantity": quantity,
            "Unit_Price": unit_price,
            "Discount_Percent": discount_percent,
            "Shipping_Cost": shipping_cost,
            "Total_Sales": total_sales,
            "Profit": profit,
            "Payment_Method": payment,
        })
    return rows


txns = generate_transactions()


# ---------- Aggregate everything the front-end needs ----------
def to_iso_month(d):
    if isinstance(d, str):
        return d[:7]
    return f"{d.year}-{d.month:02d}"


MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

# 1. KPIs
total_sales = round(sum(t["Total_Sales"] for t in txns), 2)
total_profit = round(sum(t["Profit"] for t in txns), 2)
total_orders = len(txns)
avg_order_value = round(total_sales / total_orders, 2)
avg_discount = round(sum(t["Discount_Percent"] for t in txns) / total_orders, 2)
profit_margin = round((total_profit / total_sales) * 100, 2)
total_shipping = round(sum(t["Shipping_Cost"] for t in txns), 2)
unique_customers = len({t["Customer_Name"] for t in txns})
negative_profit_orders = sum(1 for t in txns if t["Profit"] < 0)

# Previous period (2024) for YoY KPI deltas — compute by year
yearly_agg = defaultdict(lambda: {"revenue": 0, "profit": 0, "orders": 0})
for t in txns:
    y = int(t["Order_Date"][:4])
    yearly_agg[y]["revenue"] += t["Total_Sales"]
    yearly_agg[y]["profit"] += t["Profit"]
    yearly_agg[y]["orders"] += 1

kpis = {
    "total_sales": total_sales,
    "total_profit": total_profit,
    "total_orders": total_orders,
    "avg_order_value": avg_order_value,
    "avg_discount": avg_discount,
    "profit_margin": profit_margin,
    "total_shipping": total_shipping,
    "unique_customers": unique_customers,
    "negative_profit_orders": negative_profit_orders,
    "yearly": {y: {k: round(v, 2) for k, v in d.items()} for y, d in yearly_agg.items()},
}

# 2. Monthly trend (36 months)
monthly = defaultdict(lambda: {"revenue": 0, "profit": 0, "orders": 0})
for t in txns:
    ym = to_iso_month(t["Order_Date"])
    monthly[ym]["revenue"] += t["Total_Sales"]
    monthly[ym]["profit"] += t["Profit"]
    monthly[ym]["orders"] += 1
monthly_data = [
    {
        "year_month": ym,
        "label": f"{MONTH_NAMES[int(ym[5:7])]} {ym[:4]}",
        "revenue": round(monthly[ym]["revenue"], 2),
        "profit": round(monthly[ym]["profit"], 2),
        "orders": monthly[ym]["orders"],
    }
    for ym in sorted(monthly.keys())
]

# 3. Year-over-Year comparison
yoy_data = [
    {
        "year": y,
        "revenue": round(yearly_agg[y]["revenue"], 2),
        "profit": round(yearly_agg[y]["profit"], 2),
        "orders": yearly_agg[y]["orders"],
    }
    for y in sorted(yearly_agg.keys())
]

# 4. Year x Quarter heatmap
quarterly = defaultdict(lambda: defaultdict(float))
for t in txns:
    y = int(t["Order_Date"][:4])
    m = int(t["Order_Date"][5:7])
    q = (m - 1) // 3 + 1
    quarterly[y][q] += t["Total_Sales"]

heatmap_data = []
for y in sorted(quarterly.keys()):
    for q in [1, 2, 3, 4]:
        heatmap_data.append({
            "year": y,
            "quarter": f"Q{q}",
            "revenue": round(quarterly[y][q], 2),
        })

# 5. Region summary
region_summary = defaultdict(lambda: {"revenue": 0, "profit": 0, "orders": 0,
                                       "avg_order": 0, "avg_shipping": 0, "ship_count": 0})
for t in txns:
    r = t["Region"]
    region_summary[r]["revenue"] += t["Total_Sales"]
    region_summary[r]["profit"] += t["Profit"]
    region_summary[r]["orders"] += 1
    region_summary[r]["avg_shipping"] += t["Shipping_Cost"]
    region_summary[r]["ship_count"] += 1

region_data = []
for r, d in sorted(region_summary.items(), key=lambda x: -x[1]["revenue"]):
    region_data.append({
        "region": r,
        "revenue": round(d["revenue"], 2),
        "profit": round(d["profit"], 2),
        "orders": d["orders"],
        "avg_order": round(d["revenue"] / d["orders"], 2),
        "avg_shipping": round(d["avg_shipping"] / d["ship_count"], 2),
        "profit_margin": round((d["profit"] / d["revenue"]) * 100, 1),
    })

# 6. Country summary (for horizontal bar)
country_summary = defaultdict(lambda: {"revenue": 0, "profit": 0, "orders": 0, "region": ""})
for t in txns:
    c = t["Country"]
    country_summary[c]["revenue"] += t["Total_Sales"]
    country_summary[c]["profit"] += t["Profit"]
    country_summary[c]["orders"] += 1
    country_summary[c]["region"] = t["Region"]

country_data = [
    {
        "country": c,
        "region": d["region"],
        "revenue": round(d["revenue"], 2),
        "profit": round(d["profit"], 2),
        "orders": d["orders"],
    }
    for c, d in sorted(country_summary.items(), key=lambda x: -x[1]["revenue"])
]

# 7. Category summary
cat_summary = defaultdict(lambda: {"revenue": 0, "profit": 0, "orders": 0,
                                    "units": 0, "avg_price": 0, "price_count": 0,
                                    "avg_discount": 0, "disc_count": 0})
for t in txns:
    c = t["Product_Category"]
    cat_summary[c]["revenue"] += t["Total_Sales"]
    cat_summary[c]["profit"] += t["Profit"]
    cat_summary[c]["orders"] += 1
    cat_summary[c]["units"] += t["Quantity"]
    cat_summary[c]["avg_price"] += t["Unit_Price"]
    cat_summary[c]["price_count"] += 1
    cat_summary[c]["avg_discount"] += t["Discount_Percent"]
    cat_summary[c]["disc_count"] += 1

category_data = []
for c, d in sorted(cat_summary.items(), key=lambda x: -x[1]["revenue"]):
    category_data.append({
        "category": c,
        "revenue": round(d["revenue"], 2),
        "profit": round(d["profit"], 2),
        "orders": d["orders"],
        "units": d["units"],
        "avg_price": round(d["avg_price"] / d["price_count"], 2),
        "avg_discount": round(d["avg_discount"] / d["disc_count"], 2),
        "profit_margin": round((d["profit"] / d["revenue"]) * 100, 1),
    })

# 8. Top 10 products by revenue
prod_summary = defaultdict(lambda: {"revenue": 0, "profit": 0, "units": 0, "orders": 0,
                                     "category": ""})
for t in txns:
    p = t["Product_Name"]
    prod_summary[p]["revenue"] += t["Total_Sales"]
    prod_summary[p]["profit"] += t["Profit"]
    prod_summary[p]["units"] += t["Quantity"]
    prod_summary[p]["orders"] += 1
    prod_summary[p]["category"] = t["Product_Category"]

top_products_data = [
    {
        "product": p,
        "category": d["category"],
        "revenue": round(d["revenue"], 2),
        "profit": round(d["profit"], 2),
        "units": d["units"],
        "orders": d["orders"],
    }
    for p, d in sorted(prod_summary.items(), key=lambda x: -x[1]["revenue"])[:10]
]

# 9. Customer segment summary
seg_summary = defaultdict(lambda: {"revenue": 0, "profit": 0, "orders": 0,
                                    "avg_discount": 0, "disc_count": 0})
for t in txns:
    s = t["Customer_Segment"]
    seg_summary[s]["revenue"] += t["Total_Sales"]
    seg_summary[s]["profit"] += t["Profit"]
    seg_summary[s]["orders"] += 1
    seg_summary[s]["avg_discount"] += t["Discount_Percent"]
    seg_summary[s]["disc_count"] += 1

segment_data = []
for s in CUSTOMER_SEGMENTS:
    d = seg_summary[s]
    segment_data.append({
        "segment": s,
        "revenue": round(d["revenue"], 2),
        "profit": round(d["profit"], 2),
        "orders": d["orders"],
        "avg_order_value": round(d["revenue"] / d["orders"], 2),
        "avg_discount": round(d["avg_discount"] / d["disc_count"], 2),
        "profit_margin": round((d["profit"] / d["revenue"]) * 100, 1),
    })

# 10. Segment x Category cross
seg_cat = defaultdict(lambda: defaultdict(float))
for t in txns:
    seg_cat[t["Customer_Segment"]][t["Product_Category"]] += t["Total_Sales"]
segment_category_data = [
    {
        "segment": s,
        "values": {c: round(seg_cat[s][c], 2) for c in CATEGORIES},
    }
    for s in CUSTOMER_SEGMENTS
]

# 11. Discount impact scatter (sample 200 points to keep payload light)
sample_scatter = random.sample(txns, min(200, len(txns)))
discount_scatter = [
    {
        "discount": t["Discount_Percent"],
        "profit_margin": round((t["Profit"] / t["Total_Sales"]) * 100 if t["Total_Sales"] else 0, 2),
        "total_sales": round(t["Total_Sales"], 2),
        "category": t["Product_Category"],
        "product": t["Product_Name"],
    }
    for t in sample_scatter
]

# 12. Discount range analysis
def disc_range(p):
    if p <= 0:
        return "No Discount"
    elif p <= 10:
        return "1-10%"
    elif p <= 20:
        return "11-20%"
    else:
        return "21-35%"

disc_range_summary = defaultdict(lambda: {"orders": 0, "revenue": 0, "profit": 0, "margin_sum": 0})
for t in txns:
    r = disc_range(t["Discount_Percent"])
    disc_range_summary[r]["orders"] += 1
    disc_range_summary[r]["revenue"] += t["Total_Sales"]
    disc_range_summary[r]["profit"] += t["Profit"]
    if t["Total_Sales"]:
        disc_range_summary[r]["margin_sum"] += (t["Profit"] / t["Total_Sales"]) * 100

discount_range_data = []
for r in ["No Discount", "1-10%", "11-20%", "21-35%"]:
    d = disc_range_summary[r]
    if d["orders"]:
        discount_range_data.append({
            "range": r,
            "orders": d["orders"],
            "avg_revenue": round(d["revenue"] / d["orders"], 2),
            "avg_profit": round(d["profit"] / d["orders"], 2),
            "avg_margin": round(d["margin_sum"] / d["orders"], 2),
        })

# 13. Payment method
pay_summary = defaultdict(lambda: {"orders": 0, "revenue": 0})
for t in txns:
    p = t["Payment_Method"]
    pay_summary[p]["orders"] += 1
    pay_summary[p]["revenue"] += t["Total_Sales"]
total_pay_orders = sum(d["orders"] for d in pay_summary.values())
payment_data = [
    {
        "method": p,
        "orders": pay_summary[p]["orders"],
        "revenue": round(pay_summary[p]["revenue"], 2),
        "share": round((pay_summary[p]["orders"] / total_pay_orders) * 100, 1),
        "avg_order": round(pay_summary[p]["revenue"] / pay_summary[p]["orders"], 2),
    }
    for p in sorted(pay_summary.keys(), key=lambda x: -pay_summary[x]["orders"])
]

# 14. Shipping cost by region (already in region_data; reuse avg_shipping)
shipping_data = [
    {"region": r["region"], "avg_shipping": r["avg_shipping"], "profit_margin": r["profit_margin"]}
    for r in region_data
]

# 15. Correlation matrix (Quantity, Unit_Price, Discount_Percent, Total_Sales, Shipping_Cost, Profit, Profit_Margin)
def pearson(xs, ys):
    n = len(xs)
    mx = sum(xs) / n
    my = sum(ys) / n
    num = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    dx = (sum((x - mx) ** 2 for x in xs)) ** 0.5
    dy = (sum((y - my) ** 2 for y in ys)) ** 0.5
    return num / (dx * dy) if dx and dy else 0

CORR_COLS = ["Quantity", "Unit_Price", "Discount_Percent", "Total_Sales",
             "Shipping_Cost", "Profit", "Profit_Margin"]
corr_data_cols = {c: [] for c in CORR_COLS}
for t in txns:
    pm = (t["Profit"] / t["Total_Sales"] * 100) if t["Total_Sales"] else 0
    corr_data_cols["Quantity"].append(t["Quantity"])
    corr_data_cols["Unit_Price"].append(t["Unit_Price"])
    corr_data_cols["Discount_Percent"].append(t["Discount_Percent"])
    corr_data_cols["Total_Sales"].append(t["Total_Sales"])
    corr_data_cols["Shipping_Cost"].append(t["Shipping_Cost"])
    corr_data_cols["Profit"].append(t["Profit"])
    corr_data_cols["Profit_Margin"].append(pm)

correlation_matrix = []
for i, a in enumerate(CORR_COLS):
    row = {"feature": a}
    for j, b in enumerate(CORR_COLS):
        row[b] = round(pearson(corr_data_cols[a], corr_data_cols[b]), 2)
    correlation_matrix.append(row)

# 16. Day of week patterns
DOW_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
dow_summary = defaultdict(lambda: {"orders": 0, "revenue": 0})
for t in txns:
    d = date.fromisoformat(t["Order_Date"])
    dow = d.strftime("%A")
    dow_summary[dow]["orders"] += 1
    dow_summary[dow]["revenue"] += t["Total_Sales"]

dow_data = []
for d in DOW_ORDER:
    s = dow_summary[d]
    dow_data.append({
        "day": d,
        "orders": s["orders"],
        "avg_revenue": round(s["revenue"] / s["orders"], 2) if s["orders"] else 0,
    })

# 17. Recent orders sample (most recent 25 by date)
recent = sorted(txns, key=lambda t: t["Order_Date"], reverse=True)[:25]
recent_orders = [
    {
        "id": t["Order_ID"],
        "date": t["Order_Date"],
        "customer": t["Customer_Name"],
        "country": t["Country"],
        "region": t["Region"],
        "product": t["Product_Name"],
        "category": t["Product_Category"],
        "quantity": t["Quantity"],
        "total_sales": round(t["Total_Sales"], 2),
        "profit": round(t["Profit"], 2),
        "discount_percent": t["Discount_Percent"],
        "payment_method": t["Payment_Method"],
        "customer_segment": t["Customer_Segment"],
    }
    for t in recent
]

# ---------- Write TypeScript file ----------
def fmt_num(v):
    if isinstance(v, float):
        return repr(v)
    return str(v)

ts_parts = []
ts_parts.append("// AUTO-GENERATED by scripts/generate_ecommerce_data.py")
ts_parts.append("// Synthetic e-commerce dataset mirroring the notebook schema")
ts_parts.append("// 2,000 transactions across 2023-01-01 .. 2025-12-31")
ts_parts.append("")
ts_parts.append("export type Kpis = {")
ts_parts.append("  total_sales: number;")
ts_parts.append("  total_profit: number;")
ts_parts.append("  total_orders: number;")
ts_parts.append("  avg_order_value: number;")
ts_parts.append("  avg_discount: number;")
ts_parts.append("  profit_margin: number;")
ts_parts.append("  total_shipping: number;")
ts_parts.append("  unique_customers: number;")
ts_parts.append("  negative_profit_orders: number;")
ts_parts.append("  yearly: Record<number, { revenue: number; profit: number; orders: number }>;")
ts_parts.append("};")
ts_parts.append("")
ts_parts.append("export const kpis: Kpis = " + json.dumps(kpis, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const monthlyData = " + json.dumps(monthly_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const yoyData = " + json.dumps(yoy_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const heatmapData = " + json.dumps(heatmap_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const regionData = " + json.dumps(region_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const countryData = " + json.dumps(country_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const categoryData = " + json.dumps(category_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const topProductsData = " + json.dumps(top_products_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const segmentData = " + json.dumps(segment_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const segmentCategoryData = " + json.dumps(segment_category_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const discountScatter = " + json.dumps(discount_scatter, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const discountRangeData = " + json.dumps(discount_range_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const paymentData = " + json.dumps(payment_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const shippingData = " + json.dumps(shipping_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const correlationMatrix = " + json.dumps(correlation_matrix, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const correlationFeatures = " + json.dumps(CORR_COLS, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const dowData = " + json.dumps(dow_data, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const recentOrders = " + json.dumps(recent_orders, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const categoryList = " + json.dumps(CATEGORIES, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const segmentList = " + json.dumps(CUSTOMER_SEGMENTS, indent=2) + ";")
ts_parts.append("")
ts_parts.append("export const regionList = " + json.dumps(REGIONS, indent=2) + ";")
ts_parts.append("")
ts_parts.append("// Formatters for Indian Rupee (₹) and Indian Numbering System")
ts_parts.append("export const formatCurrency = (value: number, compact = false) => {")
ts_parts.append("  if (compact) {")
ts_parts.append("    const abs = Math.abs(value);")
ts_parts.append("    const sign = value < 0 ? '-' : '';")
ts_parts.append("    if (abs >= 10000000) return `${sign}₹${(abs / 10000000).toFixed(2)} Cr`;")
ts_parts.append("    if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(1)} L`;")
ts_parts.append("    if (abs >= 1000) return `${sign}₹${(abs / 1000).toFixed(1)} K`;")
ts_parts.append("    return `${sign}₹${abs.toFixed(0)}`;")
ts_parts.append("  }")
ts_parts.append("  return new Intl.NumberFormat('en-IN', {")
ts_parts.append("    style: 'currency',")
ts_parts.append("    currency: 'INR',")
ts_parts.append("    maximumFractionDigits: 0,")
ts_parts.append("  }).format(value);")
ts_parts.append("};")
ts_parts.append("")
ts_parts.append("export const formatNumber = (value: number, compact = false) => {")
ts_parts.append("  if (compact) {")
ts_parts.append("    const abs = Math.abs(value);")
ts_parts.append("    const sign = value < 0 ? '-' : '';")
ts_parts.append("    if (abs >= 10000000) return `${sign}${(abs / 10000000).toFixed(2)} Cr`;")
ts_parts.append("    if (abs >= 100000) return `${sign}${(abs / 100000).toFixed(1)} L`;")
ts_parts.append("    if (abs >= 1000) return `${sign}${(abs / 1000).toFixed(1)} K`;")
ts_parts.append("    return `${sign}${abs.toFixed(0)}`;")
ts_parts.append("  }")
ts_parts.append("  return new Intl.NumberFormat('en-IN', {")
ts_parts.append("    maximumFractionDigits: 1,")
ts_parts.append("  }).format(value);")
ts_parts.append("};")
ts_parts.append("")
ts_parts.append("export const calcChange = (current: number, previous: number) => {")
ts_parts.append("  if (previous === 0) return 0;")
ts_parts.append("  return ((current - previous) / previous) * 100;")
ts_parts.append("};")
ts_parts.append("")

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
OUT_PATH = os.path.join(PROJECT_ROOT, "src", "lib", "ecommerce-data.ts")
os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
with open(OUT_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(ts_parts))

print(f"Wrote {OUT_PATH} ({os.path.getsize(OUT_PATH):,} bytes)")
print(f"Total transactions: {N_TXNS}")
print(f"Total sales: ${total_sales:,.2f}")
print(f"Total profit: ${total_profit:,.2f}")
print(f"Profit margin: {profit_margin:.2f}%")
print(f"Unique customers: {unique_customers}")
print(f"Months: {len(monthly_data)}")
print(f"Countries: {len(country_data)}")
print(f"Categories: {len(category_data)}")
print(f"Top products: {len(top_products_data)}")
