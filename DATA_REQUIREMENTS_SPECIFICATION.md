# Data Requirements Specification
## America's Home Manager - AI Agent Management Platform

### Executive Summary
This document outlines the comprehensive data requirements for operating America's Home Manager as a fully autonomous AI Agent Management Platform. The system requires consistent, real-time operational data to provide accurate business intelligence, technician coaching, performance analytics, and automated decision making.

---

## 1. Core Operational Data

### 1.1 Service Orders Data
**Purpose**: Primary business transactions tracking service requests through completion

**Required Fields**:
- **Order Identification**
  - `orderNo` (string): Unique service order identifier
  - `serviceUnitNo` (string): Service unit reference
  - `customerId` (string): Customer identifier
  - `customerName` (string): Customer name

- **Service Details**
  - `repairType` (enum): REPAIR, MAINTENANCE, INSTALLATION, INSPECTION
  - `appliance` (enum): RANGE/COOKTOP/OVEN, REFRIGERATOR, DISHWASHER, WASHER, DRYER, MICROWAVE, etc.
  - `applianceBrand` (string): Manufacturer brand
  - `appModel` (string): Model number
  - `procedureId` (string): Service procedure identifier
  - `procedureDescription` (string): Detailed procedure

- **Geographic & Assignment**
  - `district` (string): Geographic district
  - `planningArea` (string): Service planning area
  - `technicianId` (string): Assigned technician identifier

- **Financial Data**
  - `revenue` (decimal): Total revenue for service
  - `profit` (decimal): Profit after costs
  - `laborRevenue` (decimal): Labor revenue component
  - `partsRevenue` (decimal): Parts revenue component
  - `paymentType` (enum): D2C, B2B, WARRANTY, INSURANCE

- **Timing & Status**
  - `createDate` (date): Order creation timestamp
  - `scheduleDate` (date): First scheduled appointment
  - `completeDate` (date): Service completion timestamp
  - `responseTime` (integer): Days from create to first appointment
  - `cycleTime` (integer): Days from create to completion
  - `status` (enum): CREATED, SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED

- **Quality Metrics**
  - `customerRating` (decimal): Customer satisfaction rating (1-5)
  - `techRating` (decimal): Technician performance rating (1-5)
  - `techSelfRating` (decimal): Technician self-assessment (1-5)
  - `customerComments` (text): Customer feedback
  - `techComments` (text): Technician notes
  - `callBackRequired` (boolean): Whether callback is needed
  - `warrantyIssue` (boolean): Warranty-related problem

**Data Sources Currently**: 
- National Daily Raw CSV (completed orders)
- National Daily Raw (1) CSV (created orders)

### 1.2 Technician Performance Data
**Purpose**: Individual technician performance tracking for coaching and optimization

**Required Fields**:
- **Technician Identity**
  - `techId` (string): Unique technician identifier
  - `technicianName` (string): Full technician name
  - `district` (string): Operating district
  - `basePlanningArea` (string): Primary service area
  - `techStatus` (enum): ACTIVE, TRAINING, INACTIVE, TERMINATED
  - `jobTitle` (string): Position title
  - `joiningDate` (date): Employment start date
  - `terminationDate` (date): Employment end date (if applicable)

- **Compensation & Classification**
  - `techPayRate` (decimal): Hourly pay rate
  - `employeeType` (enum): W2, 1099, CONTRACTOR
  - `experienceLevel` (enum): NOVICE, INTERMEDIATE, ADVANCED, EXPERT
  - `certifications` (array): Professional certifications held

- **Performance Metrics (Weekly/Daily)**
  - `attempts` (integer): Total service attempts
  - `attemptsActual` (integer): Attempts on assigned orders
  - `attemptsOthers` (integer): Attempts on reassigned orders
  - `actualAttemptsPercent` (decimal): Percentage of own assignments
  - `completes` (integer): Completed services
  - `completionRate` (decimal): Completion rate percentage
  - `revenue` (decimal): Total revenue generated
  - `payroll` (decimal): Total compensation
  - `payrollByRevenue` (decimal): Pay as percentage of revenue

- **Efficiency Metrics**
  - `revenuePerAttempt` (decimal): Revenue per service attempt
  - `revenuePerComplete` (decimal): Revenue per completion
  - `payHours` (decimal): Total paid hours
  - `repairTime` (decimal): Actual repair time hours
  - `travelTime` (decimal): Travel time hours
  - `utilizationRate` (decimal): Productive time percentage

- **Quality & Customer Experience**
  - `techRating` (decimal): Average technician performance rating
  - `customerRating` (decimal): Average customer satisfaction rating
  - `numCustomersRated` (integer): Number of customer ratings received
  - `ratingTrend` (enum): IMPROVING, DECLINING, STABLE
  - `customerComplaintCount` (integer): Customer complaints received
  - `safetyIncidentCount` (integer): Safety incidents reported

**Data Sources Currently**: 
- Export (6) CSV (technician weekly performance)

### 1.3 Parts Ordering & Inventory Data
**Purpose**: Parts supply chain management and delivery tracking

**Required Fields**:
- **Part Identification**
  - `sku` (string): Part SKU identifier
  - `partDescription` (string): Detailed part description
  - `skuCategory` (string): Part category classification
  - `partSource` (string): Manufacturer or supplier
  - `vendor` (string): Vendor name

- **Order Details**
  - `serviceOrderNo` (string): Associated service order
  - `partSequenceNo` (string): Part sequence in order
  - `partOrderDate` (date): Parts order placement date
  - `partOrderQuantity` (integer): Quantity ordered
  - `servicePartStatusCode` (string): Current part status
  - `partOrderStatusCode` (string): Order processing status
  - `orderEmployeeId` (string): Employee who placed order

- **Delivery Tracking**
  - `estimatedDeliveryDate` (date): EDD as promised
  - `actualDeliveryDate` (date): Actual delivery date
  - `shipDate` (date): Shipping date
  - `deliveryTrackingNumber` (string): Tracking number
  - `isDeliveryOnTime` (boolean): Met delivery promise
  - `deliveryDaysActual` (integer): Actual delivery days
  - `deliveryDaysEstimated` (integer): Estimated delivery days

- **Financial & Inventory**
  - `lawsonCost` (decimal): Wholesale cost
  - `lawsonSell` (decimal): Retail price
  - `partUnitCostPrice` (decimal): Unit cost
  - `partUnitSellPrice` (decimal): Unit sell price
  - `backorderFlag` (boolean): On backorder status
  - `stockLevel` (integer): Current inventory level

**Data Sources Currently**: 
- PartsDaily CSV files
- OpenOrder CSV (pending orders)

---

## 2. Business Intelligence Data

### 2.1 Financial Performance Data
**Purpose**: P&L analysis and financial intelligence across geographic areas

**Required Fields**:
- **Geographic & Temporal**
  - `district` (string): District identifier
  - `planningArea` (string): Planning area within district
  - `reportingPeriod` (string): Month/Quarter/Year
  - `fiscalYear` (integer): Fiscal year
  - `fiscalQuarter` (integer): Fiscal quarter

- **Revenue Components**
  - `totalRevenue` (decimal): Total revenue
  - `laborRevenue` (decimal): Labor revenue
  - `partsRevenue` (decimal): Parts revenue
  - `d2cRevenue` (decimal): Direct-to-consumer revenue
  - `b2bRevenue` (decimal): Business-to-business revenue
  - `warrantyRevenue` (decimal): Warranty work revenue
  - `maintenanceRevenue` (decimal): Maintenance contract revenue

- **Cost Structure**
  - `totalCosts` (decimal): Total operating costs
  - `laborCosts` (decimal): Technician labor costs
  - `partsCosts` (decimal): Parts costs
  - `travelCosts` (decimal): Travel and transportation
  - `overheadCosts` (decimal): Operational overhead
  - `trainingCosts` (decimal): Technician training costs

- **Profitability Metrics**
  - `grossProfit` (decimal): Revenue minus direct costs
  - `netProfit` (decimal): Profit after all expenses
  - `grossMargin` (decimal): Gross profit percentage
  - `netMargin` (decimal): Net profit percentage
  - `ebitda` (decimal): Earnings before interest, taxes, depreciation, amortization
  - `payrollToRevenue` (decimal): Payroll as percentage of revenue

**Data Sources Currently**: 
- Planning Area Comparison Excel files
- Business P&L data

### 2.2 Call Disposition & Scheduling Data
**Purpose**: AI Scheduling Agent performance and call handling analytics

**Required Fields**:
- **Call Identification**
  - `callId` (string): Unique call identifier
  - `customerId` (string): Customer identifier
  - `inboundDate` (date): Call received date
  - `callType` (enum): EMERGENCY, STANDARD, MAINTENANCE, INQUIRY
  - `channel` (enum): PHONE, ONLINE, MOBILE_APP, CHAT

- **Scheduling Intelligence**
  - `aiAgentId` (string): AI agent handling call
  - `dispositionCode` (string): Call resolution code
  - `scheduleAttempts` (integer): Attempts to schedule
  - `scheduledDate` (date): Appointment scheduled for
  - `technicianAssigned` (string): Assigned technician
  - `estimatedDuration` (integer): Estimated service time
  - `priorityLevel` (integer): Service priority (1-5)

- **Resolution Tracking**
  - `callResolved` (boolean): Call successfully resolved
  - `customerSatisfaction` (decimal): Call satisfaction rating
  - `aiConfidenceScore` (decimal): AI agent confidence in resolution
  - `humanEscalation` (boolean): Required human intervention
  - `rescheduleCount` (integer): Number of reschedules needed

**Data Sources Needed**: 
- Call disposition tracking system
- AI Scheduling Agent logs

---

## 3. Real-Time Operational Data

### 3.1 Live System Metrics
**Purpose**: Real-time platform monitoring and performance tracking

**Required Fields**:
- **System Performance**
  - `timestamp` (datetime): Metric collection time
  - `activeAgents` (integer): AI agents currently active
  - `totalRequests` (integer): Total system requests
  - `averageResponseTime` (decimal): System response time (seconds)
  - `errorRate` (decimal): Error rate percentage
  - `uptime` (decimal): System uptime percentage

- **Business Operations**
  - `activeOrders` (integer): Orders currently in progress
  - `technicianUtilization` (decimal): Technician utilization rate
  - `dailyRevenue` (decimal): Revenue generated today
  - `customerCalls` (integer): Customer calls handled
  - `partsOrdersPending` (integer): Parts orders awaiting delivery

**Data Sources Needed**: 
- Real-time system logs
- Live operational dashboards

### 3.2 Technician Real-Time Status
**Purpose**: Live technician tracking and coordination

**Required Fields**:
- **Location & Status**
  - `technicianId` (string): Technician identifier
  - `currentLocation` (coordinates): GPS coordinates
  - `status` (enum): AVAILABLE, EN_ROUTE, ON_SITE, BREAK, OFFLINE
  - `currentOrderId` (string): Current service order
  - `estimatedCompletion` (datetime): ETA for current job

- **Performance Today**
  - `ordersCompleted` (integer): Orders completed today
  - `revenueGenerated` (decimal): Revenue generated today
  - `hoursWorked` (decimal): Hours worked today
  - `milesTravel` (decimal): Miles traveled
  - `customerRatingAvg` (decimal): Average rating today

**Data Sources Needed**: 
- Mobile technician apps
- GPS tracking systems
- Real-time order management

---

## 4. Historical Analytics Data

### 4.1 Trend Analysis Data
**Purpose**: Historical performance analysis and forecasting

**Required Fields**:
- **Time Series Metrics**
  - `date` (date): Metric date
  - `period` (enum): HOUR, DAY, WEEK, MONTH, QUARTER, YEAR
  - `metricType` (string): Type of metric being tracked
  - `metricValue` (decimal): Metric value
  - `comparisonPeriod` (decimal): Previous period value
  - `trend` (enum): INCREASING, DECREASING, STABLE
  - `seasonalFactor` (decimal): Seasonal adjustment factor

- **Aggregated Performance**
  - `totalOrders` (integer): Orders in period
  - `completionRate` (decimal): Completion rate
  - `averageRevenue` (decimal): Average revenue per order
  - `customerSatisfaction` (decimal): Average customer satisfaction
  - `technicianCount` (integer): Active technicians
  - `newCustomers` (integer): New customers acquired

**Data Sources Currently**: 
- Historical metrics processing from existing CSV data

---

## 5. AI Agent Training & Performance Data

### 5.1 Agent Evaluation Data
**Purpose**: AI agent performance monitoring and improvement

**Required Fields**:
- **Agent Identity**
  - `agentId` (string): Unique agent identifier
  - `agentType` (string): Agent category/specialization
  - `evaluationDate` (date): Evaluation timestamp
  - `evaluatorId` (string): Who performed evaluation

- **Performance Metrics**
  - `accuracy` (decimal): Decision accuracy percentage
  - `responseTime` (decimal): Average response time
  - `successRate` (decimal): Successful task completion rate
  - `customerImpact` (decimal): Customer satisfaction impact
  - `revenueImpact` (decimal): Revenue impact
  - `costEfficiency` (decimal): Cost per successful action

- **Learning & Improvement**
  - `trainingVersion` (string): Model version
  - `confidenceLevel` (decimal): Agent confidence in decisions
  - `improvementAreas` (array): Areas needing enhancement
  - `recommendedActions` (array): Suggested improvements

**Data Sources Currently**: 
- Agent evaluation system
- Performance tracking databases

---

## 6. Data Integration Requirements

### 6.1 Real-Time Data Feeds
**Priority 1 (Immediate)**:
- Service order creation/completion events
- Technician status updates
- Parts delivery confirmations
- Customer satisfaction submissions

**Priority 2 (Short-term)**:
- Financial transaction processing
- AI agent decision logging
- System performance monitoring
- Call disposition tracking

**Priority 3 (Medium-term)**:
- Predictive analytics inputs
- Market intelligence data
- Competitive benchmarking
- Advanced coaching metrics

### 6.2 Data Quality Standards
**Completeness**: 95% of required fields populated
**Accuracy**: ≤2% error rate in critical fields
**Timeliness**: Real-time data ≤5 minute lag, batch data ≤24 hours
**Consistency**: Standardized formats across all data sources
**Validation**: Automated data quality checks at ingestion

### 6.3 Current Data Gaps
**Missing Critical Data**:
- Real-time technician location/status
- Live call disposition tracking
- Streaming parts delivery updates
- Customer interaction history
- AI agent decision logs

**Inconsistent Data**:
- Response time calculations (CSV vs computed values)
- Technician naming conventions
- Date format standardization
- Geographic area classifications

---

## 7. Technical Implementation Considerations

### 7.1 Data Storage Architecture
- **Real-time**: In-memory processing for live updates
- **Operational**: PostgreSQL for transactional data
- **Analytics**: Time-series database for historical metrics
- **Archive**: Long-term storage for compliance

### 7.2 Data Processing Pipeline
- **Ingestion**: RESTful APIs, CSV processing, streaming connectors
- **Validation**: Schema validation, business rule checking
- **Transformation**: Data cleansing, standardization, enrichment
- **Distribution**: Real-time updates to dashboard components

### 7.3 Security & Compliance
- **Access Control**: Role-based data access permissions
- **Encryption**: Data encryption at rest and in transit
- **Audit Trail**: Complete data lineage tracking
- **Privacy**: Customer PII protection and anonymization

---

## 8. Recommended Next Steps

### 8.1 Immediate Actions (Week 1)
1. **Standardize existing CSV data** - Fix response time calculations and naming inconsistencies
2. **Create unified data interface** - Single API layer for all data access
3. **Implement data validation** - Catch inconsistencies at ingestion
4. **Fix search functionality** - Ensure frontend filtering matches backend data

### 8.2 Short-term Goals (Month 1)
1. **Real-time technician feeds** - Live status and location tracking
2. **Streaming parts data** - Real-time delivery and inventory updates
3. **Call disposition integration** - AI Scheduling Agent performance tracking
4. **Financial data automation** - Automated P&L and performance calculation

### 8.3 Long-term Vision (Quarter 1)
1. **Predictive analytics** - Forecasting and optimization models
2. **Advanced coaching** - AI-powered technician development
3. **Customer intelligence** - 360-degree customer view
4. **Autonomous operations** - Self-healing and self-optimizing systems

---

This specification provides the foundation for transitioning America's Home Manager to a fully data-driven, real-time operational intelligence platform capable of supporting both current operations and future streaming data integration.