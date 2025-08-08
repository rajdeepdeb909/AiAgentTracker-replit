# Complete Dataset Inventory - America's Home Manager Platform

## Data Files Overview

### New Open Orders Data (July 30, 2025)
- **Open Order Raw Formatted (4)_1753878239345.csv** (✅ Active - 45,976 orders)
  - Complete lifecycle tracking for all open service orders
  - Status distribution: AT (Assigned Tech), WS (Waiting Service), WP (Waiting Parts), RN (Reschedule Needed)
  - Risk analysis: Critical (30+ days), High (15-30 days), Medium (8-14 days), Low (0-7 days)
  - AI Agents: Outstanding Orders Manager, Customer Communication Hub, Parts Prediction Engine, Advanced Scheduling Agent
  - Processing: Integrated with open-orders-processor.ts and full API endpoints
- **OpenOrder (2)_1753878279891.xlsx** (📊 Available)
  - Data glossary and field definitions for open orders
  - Reference documentation for system integration

### Service Order Data
1. **National Daily Raw_1753867144574.csv** (3.6MB)
   - Contains 3,821 service order records
   - Primary source for completed orders analysis
   - Fields: Order details, technician assignments, revenue, profit, customer info
   - Status: ✅ Active - Main data source for completed orders

2. **National Daily Raw (1)_1753867222633.csv** (3.5MB)
   - Secondary service order dataset
   - Contains created service orders data
   - Status: 📊 Available for analysis

3. **completed_service_orders_20250725.csv** (297KB)
   - Previously processed service order data
   - Status: 📋 Archive

### Technician Performance Data
4. **Export (6)_1753867058176.csv** (776KB)
   - Contains 1,060+ technician performance records
   - Weekly performance metrics, completion rates, revenue data
   - Status: ✅ Active - Main source for technician coaching

5. **Export (2)_1753622579730.csv** (197KB)
   - Additional technician data export
   - Status: 📊 Available

6. **Export (5)_1753637087580.csv** (214KB)
   - Technician performance supplementary data
   - Status: 📊 Available

### Parts and Inventory Data
7. **PartsDaily_1753446244347.xlsx** (11KB)
   - Parts ordering and inventory tracking
   - Status: ✅ Active for parts management

8. **PartsDaily (1)_1753624700802.xlsx** (11KB)
   - Additional parts daily data
   - Status: 📊 Available

9. **PartsDaily (1)_1753638002140.xlsx** (11KB)
   - Parts data update
   - Status: 📊 Available

10. **OpenOrder_1753446244347.xlsx** (120KB)
    - Open orders tracking
    - Status: ✅ Active for order management

### Financial Data
11. **national-pnl (2)_1753593039674.xlsx** (67KB)
    - National P&L financial data
    - Status: ✅ Active for financial intelligence

12. **national-pnl (4)_1753624879336.xlsx** (75KB)
    - Updated national P&L data
    - Status: 📊 Available

13. **PlanningAreaComparision-national-monthly (2)_1753593661583.xlsx** (465KB)
    - Planning area performance comparison data
    - Status: ✅ Active for regional analysis

### Reference Data
14. **NationalDaily_Glossary_1753446244328.xlsx** (18KB)
    - Data field definitions and glossary
    - Status: 📚 Reference

15. **Weekly_Prompts_Unique_545_1753446523107.csv** (89KB)
    - 545 unique AI prompts for business analysis
    - Status: ✅ Active for business knowledge system

### Additional Export Files
16-21. **Various export_*.csv files** (Multiple)
    - Additional data exports with varying content
    - Status: 📊 Available for specific analysis

## Data Integration Status

### Currently Active Sources
- **Service Orders**: National Daily Raw_1753867144574.csv (3,245 completed orders)
- **Technician Data**: Export (6)_1753867058176.csv (1,060+ technicians)
- **Parts Management**: PartsDaily and OpenOrder Excel files
- **Financial Intelligence**: National P&L and planning area comparison data
- **Business Intelligence**: Weekly prompts and glossary data

### Processing Statistics
- **Total Completed Orders**: 3,245 orders processed
- **Total Revenue Tracked**: $843K+ from completed orders
- **Technician Records**: 1,060+ active technician profiles
- **Planning Areas**: 430+ geographical planning areas
- **AI Prompts**: 545 unique business analysis prompts

### Data Quality
- ✅ Unified data processing system implemented
- ✅ Consistent CSV column mapping
- ✅ Real-time search functionality
- ✅ Cross-reference navigation between orders and technicians
- ✅ Proper date handling and response time calculations

## Future Data Integration
- 🔄 Ready for streaming data connectors
- 🔄 Real-time data feed integration capability
- 🔄 Automated data refresh mechanisms