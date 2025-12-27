# Railway Management System - OOAD Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Requirements](#system-requirements)
3. [Class Diagram](#class-diagram)
4. [Use Case Diagram](#use-case-diagram)
5. [Sequence Diagrams](#sequence-diagrams)
6. [Activity Diagrams](#activity-diagrams)
7. [Class Structure & Relationships](#class-structure--relationships)
8. [Design Patterns](#design-patterns)
9. [UML Notation Reference](#uml-notation-reference)

---

## Project Overview

**Project Name:** Railway Management System  
**Type:** Web-based Management System  
**Technology Stack:** HTML, CSS, JavaScript (ES6 Classes)  
**Database:** JSON-based (localStorage)  
**Purpose:** OOAD demonstration project for educational purposes

### System Description
A web-based railway management system that allows passengers to book train tickets and railway staff to manage trains and bookings. The system demonstrates core Object-Oriented Analysis and Design (OOAD) principles.

---

## System Requirements

### Functional Requirements

#### Passenger Requirements
1. View list of available trains
2. Book a train ticket
3. View personal booking history
4. Cancel confirmed bookings

#### Railway Staff Requirements
1. Add new trains to the system
2. Update train details (capacity, schedule)
3. Delete trains (with validation)
4. View all bookings
5. Confirm pending bookings (issue tickets)
6. Process booking returns/cancellations

### Non-Functional Requirements
- Client-side storage using localStorage
- Responsive web interface
- Clean, maintainable code structure
- OOAD principles demonstration

---

## Class Diagram

### Complete Class Diagram (Textual Representation)

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLASS DIAGRAM                           │
└─────────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │     User     │ (Abstract Base Class)
                    ├──────────────┤
                    │ -id: String  │
                    │ -name: String│
                    │ -email: String│
                    ├──────────────┤
                    │ +getId()     │
                    │ +getName()   │
                    │ +getEmail()  │
                    │ +displayInfo()│
                    └──────┬───────┘
                           │
            ┌──────────────┴──────────────┐
            │          (extends)          │
            │                             │
    ┌───────┴────────┐          ┌────────┴────────┐
    │   Passenger    │          │  RailwayStaff   │
    ├────────────────┤          ├─────────────────┤
    │ -bookings: []  │          │ -designation:   │
    ├────────────────┤          │   String        │
    │ +bookTrain()   │          ├─────────────────┤
    │ +getMyBookings()│         │ +getDesignation()│
    └────────┬───────┘          │ +addTrain()     │
             │                  │ +updateTrainStatus()│
             │                  │ +deleteTrain()  │
             │                  │ +issueBooking() │
             │                  │ +processReturn()│
             └──────────────────┴────────┬────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
                    │                    ┌────────────────────┴──────┐
                    │                    │      Booking              │
                    │                    ├───────────────────────────┤
                    │                    │ -bookingId: String        │
                    │                    │ -passengerId: String      │
                    │                    │ -trainId: String          │
                    │                    │ -bookingDate: String      │
                    │                    │ -status: String           │
                    │                    │ -seatNumber: Integer      │
                    │                    ├───────────────────────────┤
                    │                    │ +getBookingId()          │
                    │                    │ +getPassengerId()        │
                    │                    │ +getTrainId()            │
                    │                    │ +getStatus()             │
                    │                    │ +setStatus()             │
                    │                    │ +setSeatNumber()         │
                    │                    └────────────┬─────────────┘
                    │                                 │
                    │                    ┌────────────┴─────────────┐
                    │                    │        Train             │
                    │                    ├──────────────────────────┤
                    │                    │ -trainId: String         │
                    │                    │ -trainName: String       │
                    │                    │ -source: String          │
                    │                    │ -destination: String     │
                    │                    │ -departureDate: String   │
                    │                    │ -departureTime: String   │
                    │                    │ -totalSeats: Integer     │
                    │                    │ -bookedSeats: Integer    │
                    │                    ├──────────────────────────┤
                    │                    │ +getTrainId()           │
                    │                    │ +getTrainName()         │
                    │                    │ +getSource()            │
                    │                    │ +getDestination()       │
                    │                    │ +getAvailableSeats()    │
                    │                    │ +bookSeat()             │
                    │                    │ +releaseSeat()          │
                    │                    └────────────┬─────────────┘
                    │                                 │
                    │                    ┌────────────┴─────────────┐
                    │                    │    RailwaySystem         │
                    │                    ├──────────────────────────┤
                    │                    │ -trains: Train[]         │
                    │                    │ -bookings: Booking[]     │
                    │                    ├──────────────────────────┤
                    │                    │ +addTrain()             │
                    │                    │ +getAllTrains()         │
                    │                    │ +getTrainById()         │
                    │                    │ +updateTrain()          │
                    │                    │ +removeTrain()          │
                    │                    │ +addBooking()           │
                    │                    │ +getAllBookings()       │
                    │                    │ +getBookingsByPassenger()│
                    │                    │ +updateBooking()        │
                    │                    │ +cancelBooking()        │
                    │                    └──────────────────────────┘
```

### Class Relationships Summary

1. **Inheritance (Generalization)**
   - `Passenger` extends `User`
   - `RailwayStaff` extends `User`

2. **Association**
   - `Passenger` → `Booking` (One-to-Many)
   - `Booking` → `Train` (Many-to-One)
   - `Booking` → `Passenger` (Many-to-One)

3. **Aggregation**
   - `RailwaySystem` contains `Train[]` (has-a relationship)
   - `RailwaySystem` contains `Booking[]` (has-a relationship)

4. **Dependency**
   - `Passenger` depends on `RailwaySystem` for booking operations
   - `RailwayStaff` depends on `RailwaySystem` for train management

---

## Use Case Diagram

### Use Case Diagram (Textual Representation)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USE CASE DIAGRAM                        │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────────┐                          ┌──────────────┐
    │  Passenger   │                          │ RailwayStaff │
    └──────┬───────┘                          └──────┬───────┘
           │                                         │
           │                                         │
    ┌──────┴──────────────────┐            ┌────────┴──────────────────┐
    │                         │            │                           │
    │  • View Trains          │            │  • Add Train              │
    │  • Book Ticket          │            │  • Update Train           │
    │  • View Bookings        │            │  • Delete Train           │
    │  • Cancel Booking       │            │  • View All Bookings      │
    │                         │            │  • Confirm Booking        │
    │                         │            │  • Process Return         │
    └─────────────────────────┘            └───────────────────────────┘
           │                                         │
           │                                         │
           └──────────────┬──────────────────────────┘
                          │
                          ▼
           ┌──────────────────────────┐
           │  Railway Management      │
           │       System             │
           ├──────────────────────────┤
           │  • Manage Trains         │
           │  • Manage Bookings       │
           │  • Store Data (JSON)     │
           └──────────────────────────┘
```

### Use Case Descriptions

#### UC1: View Trains (Passenger)
- **Actor:** Passenger
- **Precondition:** User is logged in as Passenger
- **Main Flow:**
  1. Passenger requests to view trains
  2. System displays list of all available trains
  3. System shows train details (name, route, date, available seats)
- **Postcondition:** Passenger can see all available trains

#### UC2: Book Ticket (Passenger)
- **Actor:** Passenger
- **Precondition:** Passenger is logged in, train has available seats
- **Main Flow:**
  1. Passenger selects a train
  2. Passenger clicks "Book Ticket"
  3. System creates a new booking with PENDING status
  4. System reduces available seats by 1
  5. System stores booking in database
- **Alternative Flow:** If no seats available, display error message
- **Postcondition:** New booking created with PENDING status

#### UC3: View Bookings (Passenger)
- **Actor:** Passenger
- **Precondition:** Passenger is logged in
- **Main Flow:**
  1. Passenger requests to view bookings
  2. System retrieves all bookings for this passenger
  3. System displays booking list with details
- **Postcondition:** Passenger can see all their bookings

#### UC4: Cancel Booking (Passenger)
- **Actor:** Passenger
- **Precondition:** Booking exists and status is CONFIRMED
- **Main Flow:**
  1. Passenger selects a booking
  2. Passenger clicks "Cancel Booking"
  3. System changes booking status to CANCELLED
  4. System releases the seat (increases available seats)
  5. System updates database
- **Postcondition:** Booking is cancelled, seat is available

#### UC5: Add Train (Railway Staff)
- **Actor:** Railway Staff
- **Precondition:** User is logged in as Railway Staff
- **Main Flow:**
  1. Staff fills in train details form
  2. Staff submits form
  3. System validates train ID (must be unique)
  4. System creates new Train object
  5. System adds train to RailwaySystem
  6. System stores train in database
- **Alternative Flow:** If train ID exists, display error
- **Postcondition:** New train is added to system

#### UC6: Confirm Booking (Railway Staff)
- **Actor:** Railway Staff
- **Precondition:** Booking exists with PENDING status
- **Main Flow:**
  1. Staff views pending bookings
  2. Staff selects a booking to confirm
  3. Staff clicks "Confirm Booking"
  4. System assigns seat number
  5. System changes booking status to CONFIRMED
  6. System increments booked seats count
  7. System updates database
- **Postcondition:** Booking is confirmed with seat number

#### UC7: Process Return (Railway Staff)
- **Actor:** Railway Staff
- **Precondition:** Booking exists with CONFIRMED status
- **Main Flow:**
  1. Staff selects a confirmed booking
  2. Staff clicks "Process Return"
  3. System changes booking status to RETURNED
  4. System releases the seat (decreases booked seats)
  5. System updates database
- **Postcondition:** Booking is returned, seat is available

---

## Sequence Diagrams

### Sequence Diagram 1: Book Train Ticket

```
Passenger    Passenger    RailwaySystem    Train      Booking      Database
    │            │             │            │           │            │
    │  bookTrain()│            │            │           │            │
    │────────────>│            │            │           │            │
    │             │  getTrainById()         │           │            │
    │             │───────────>│            │           │            │
    │             │<───────────│            │           │            │
    │             │  getAvailableSeats()    │           │            │
    │             │───────────>│            │           │            │
    │             │<───────────│            │           │            │
    │             │  new Booking()          │           │            │
    │             │─────────────────────────┼──────────>│            │
    │             │  addBooking()           │           │            │
    │             │─────────────────────────┼──────────>│            │
    │             │                         │           │  save()    │
    │             │                         │           │───────────>│
    │             │                         │           │<───────────│
    │<────────────│                         │           │            │
    │  (Booking)  │                         │           │            │
```

### Sequence Diagram 2: Confirm Booking (Issue Ticket)

```
RailwayStaff  RailwayStaff  RailwaySystem  Booking    Train      Database
     │             │              │           │         │           │
     │ issueBooking()             │           │         │           │
     │────────────>│              │           │         │           │
     │             │  getBookingById()        │         │           │
     │             │──────────────>│          │         │           │
     │             │<──────────────│          │         │           │
     │             │  getTrainById()          │         │           │
     │             │──────────────>│          │         │           │
     │             │<──────────────│          │         │           │
     │             │  bookSeat()              │         │           │
     │             │──────────────>│          │         │           │
     │             │  setSeatNumber()         │         │           │
     │             │──────────────>│          │         │           │
     │             │  setStatus(CONFIRMED)    │         │           │
     │             │──────────────>│          │         │           │
     │             │  updateBooking()         │         │           │
     │             │──────────────>│          │         │           │
     │             │  updateTrain()           │         │           │
     │             │──────────────>│          │         │           │
     │             │                         │  save()  │           │
     │             │                         │─────────>│           │
     │             │                         │<─────────│           │
     │<────────────│                         │          │           │
     │  (success)  │                         │          │           │
```

---

## Activity Diagrams

### Activity Diagram: Book Ticket Process

```
┌───────────────────────────────────────────────────────────┐
│              BOOK TICKET ACTIVITY DIAGRAM                 │
└───────────────────────────────────────────────────────────┘

    [Start]
       │
       ▼
┌─────────────────┐
│ Select Train    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Check Available │
│ Seats           │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
   Yes       No
    │         │
    │         ▼
    │   ┌──────────┐
    │   │ Show     │
    │   │ Error    │
    │   └────┬─────┘
    │        │
    │        ▼
    │   [End]
    │
    ▼
┌─────────────────┐
│ Create Booking  │
│ (PENDING)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Save to         │
│ Database        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Show Success    │
│ Message         │
└────────┬────────┘
         │
         ▼
      [End]
```

### Activity Diagram: Staff Confirm Booking Process

```
┌───────────────────────────────────────────────────────────┐
│          STAFF CONFIRM BOOKING ACTIVITY DIAGRAM           │
└───────────────────────────────────────────────────────────┘

    [Start]
       │
       ▼
┌─────────────────┐
│ View Pending    │
│ Bookings        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Select Booking  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Check Train     │
│ Available Seats │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
   Yes       No
    │         │
    │         ▼
    │   ┌──────────┐
    │   │ Show     │
    │   │ Error    │
    │   └────┬─────┘
    │        │
    │        ▼
    │   [End]
    │
    ▼
┌─────────────────┐
│ Assign Seat     │
│ Number          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Set Status =    │
│ CONFIRMED       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Increment       │
│ Booked Seats    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Update Database │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Show Success    │
└────────┬────────┘
         │
         ▼
      [End]
```

---

## Class Structure & Relationships

### Detailed Class Descriptions

#### 1. User (Abstract Base Class)
- **Purpose:** Base class for all users in the system
- **OOAD Concept:** Inheritance, Abstraction
- **Attributes:**
  - `_id` (String): Unique user identifier
  - `_name` (String): User's full name
  - `_email` (String): User's email address
- **Methods:**
  - `getId()`: Returns user ID
  - `getName()`: Returns user name
  - `getEmail()`: Returns user email
  - `displayInfo()`: Displays user information

#### 2. Passenger (Child Class)
- **Purpose:** Represents a passenger who can book tickets
- **OOAD Concept:** Inheritance (extends User), Association with Booking
- **Attributes:**
  - Inherits: `_id`, `_name`, `_email` from User
  - `_bookings` (Array): List of booking IDs
- **Methods:**
  - `bookTrain(train, system)`: Creates a new booking
  - `getMyBookings(system)`: Returns all bookings for this passenger

#### 3. RailwayStaff (Child Class)
- **Purpose:** Represents staff who manage trains and bookings
- **OOAD Concept:** Inheritance (extends User)
- **Attributes:**
  - Inherits: `_id`, `_name`, `_email` from User
  - `_designation` (String): Staff designation/role
- **Methods:**
  - `getDesignation()`: Returns staff designation
  - `addTrain(train, system)`: Adds a new train
  - `updateTrainStatus(train, newSeats, system)`: Updates train capacity
  - `deleteTrain(trainId, system)`: Removes a train
  - `issueBooking(booking, system)`: Confirms a booking
  - `processReturn(booking, system)`: Processes booking return

#### 4. Train (Domain Entity)
- **Purpose:** Represents a train in the system
- **OOAD Concept:** Encapsulation, Aggregation (part of RailwaySystem)
- **Attributes:**
  - `_trainId` (String): Unique train identifier
  - `_trainName` (String): Name of the train
  - `_source` (String): Source station
  - `_destination` (String): Destination station
  - `_departureDate` (String): Departure date
  - `_departureTime` (String): Departure time
  - `_totalSeats` (Integer): Total number of seats
  - `_bookedSeats` (Integer): Number of booked seats
- **Methods:**
  - Getters: `getTrainId()`, `getTrainName()`, `getSource()`, `getDestination()`, etc.
  - `getAvailableSeats()`: Returns available seats count
  - `bookSeat()`: Increments booked seats
  - `releaseSeat()`: Decrements booked seats
  - `toJSON()`: Converts to JSON for storage
  - `static fromJSON(data)`: Creates Train from JSON

#### 5. Booking (Domain Entity)
- **Purpose:** Represents a ticket booking
- **OOAD Concept:** Association (links Passenger and Train)
- **Attributes:**
  - `_bookingId` (String): Unique booking identifier
  - `_passengerId` (String): ID of the passenger (Association)
  - `_trainId` (String): ID of the train (Association)
  - `_bookingDate` (String): Date of booking
  - `_status` (String): PENDING, CONFIRMED, RETURNED, CANCELLED
  - `_seatNumber` (Integer): Assigned seat number
- **Methods:**
  - Getters: `getBookingId()`, `getPassengerId()`, `getTrainId()`, etc.
  - `setStatus(status)`: Updates booking status
  - `setSeatNumber(number)`: Assigns seat number
  - `toJSON()`: Converts to JSON for storage
  - `static fromJSON(data)`: Creates Booking from JSON

#### 6. RailwaySystem (Aggregate Root)
- **Purpose:** Manages all trains and bookings
- **OOAD Concept:** Aggregation, Singleton pattern
- **Attributes:**
  - `_trains` (Array<Train>): Collection of trains
  - `_bookings` (Array<Booking>): Collection of bookings
- **Methods:**
  - Train Management: `addTrain()`, `getAllTrains()`, `getTrainById()`, `updateTrain()`, `removeTrain()`
  - Booking Management: `addBooking()`, `getAllBookings()`, `getBookingById()`, `getBookingsByPassenger()`, `updateBooking()`, `cancelBooking()`
  - Database: `loadFromDatabase()`, `saveToDatabase()`, `_syncBookedSeats()`

### Relationship Details

#### Inheritance Hierarchy
```
User (Base Class)
├── Passenger
└── RailwayStaff
```

#### Association Relationships
- **Passenger ↔ Booking:** One-to-Many (1 Passenger has many Bookings)
- **Booking ↔ Train:** Many-to-One (Many Bookings belong to 1 Train)
- **Booking ↔ Passenger:** Many-to-One (Many Bookings belong to 1 Passenger)

#### Aggregation Relationships
- **RailwaySystem ⊃ Train[]:** RailwaySystem contains/aggregates Trains (weak ownership)
- **RailwaySystem ⊃ Booking[]:** RailwaySystem contains/aggregates Bookings (weak ownership)

---

## Design Patterns

### 1. Inheritance Pattern
- **Pattern:** Class Inheritance (Generalization)
- **Implementation:** `Passenger` and `RailwayStaff` extend `User`
- **Benefit:** Code reuse, polymorphism, common interface

### 2. Encapsulation Pattern
- **Pattern:** Data Hiding with Accessors
- **Implementation:** Private properties (prefixed with `_`) with public getter/setter methods
- **Benefit:** Data protection, controlled access, maintainability

### 3. Singleton Pattern
- **Pattern:** Single Instance Pattern
- **Implementation:** Global `railwaySystem` instance
- **Benefit:** Single point of control, centralized state management

### 4. Data Transfer Object (DTO) Pattern
- **Pattern:** `toJSON()` and `fromJSON()` methods
- **Implementation:** Convert objects to/from JSON for persistence
- **Benefit:** Separation of concerns, data serialization

---

## UML Notation Reference

### Class Diagram Symbols

| Symbol | Meaning |
|--------|---------|
| `+` | Public method/property |
| `-` | Private method/property |
| `#` | Protected method/property |
| `<<abstract>>` | Abstract class |
| `─────` | Association (solid line) |
| `──▷` | Inheritance/Generalization (solid line with arrow) |
| `──◇` | Aggregation (diamond end) |
| `──◆` | Composition (filled diamond) |
| `1` | One |
| `*` | Many |
| `0..1` | Zero or One |
| `1..*` | One or Many |

### Relationship Types

1. **Inheritance (Generalization):** `──▷`
   - Example: `Passenger ──▷ User`
   - Meaning: "Passenger is-a User"

2. **Association:** `─────`
   - Example: `Passenger ───── Booking`
   - Meaning: "Passenger has Bookings"

3. **Aggregation:** `──◇`
   - Example: `RailwaySystem ──◇ Train`
   - Meaning: "RailwaySystem contains Trains" (weak ownership)

4. **Dependency:** `─────>`
   - Example: `Passenger ─────> RailwaySystem`
   - Meaning: "Passenger depends on RailwaySystem"

---

## Key OOAD Concepts Demonstrated

### 1. Inheritance
- **Concept:** Child classes inherit properties and methods from parent class
- **Example:** `Passenger` and `RailwayStaff` inherit `_id`, `_name`, `_email` from `User`
- **Code Location:** `script.js` - User, Passenger, RailwayStaff classes

### 2. Encapsulation
- **Concept:** Data hiding with controlled access through methods
- **Example:** Private properties (`_id`, `_name`) accessed via getters (`getId()`, `getName()`)
- **Code Location:** All classes use private properties with public methods

### 3. Association
- **Concept:** Relationship between classes (has-a relationship)
- **Example:** `Booking` class has `_passengerId` and `_trainId` (references)
- **Code Location:** Booking class attributes and Passenger.bookTrain() method

### 4. Aggregation
- **Concept:** "Has-a" relationship with weak ownership
- **Example:** `RailwaySystem` contains `Train[]` and `Booking[]` arrays
- **Code Location:** RailwaySystem class attributes

### 5. Abstraction
- **Concept:** Hiding implementation details, showing only essential features
- **Example:** `User` base class provides common interface
- **Code Location:** User class with abstract methods

### 6. Polymorphism
- **Concept:** Different classes can be treated through same interface
- **Example:** Both `Passenger` and `RailwayStaff` can use `User` methods
- **Code Location:** Inheritance hierarchy allows polymorphic usage

---

## System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│  (HTML - index.html, passenger-dashboard.html, etc.)    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                  │
│  (JavaScript Classes - script.js)                       │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │   User   │  │  Train   │  │ Booking  │            │
│  └────┬─────┘  └──────────┘  └──────────┘            │
│       │                                                │
│  ┌────┴────┐  ┌──────────────┐                       │
│  │Passenger│  │RailwaySystem │                       │
│  │Railway  │  │(Aggregate)   │                       │
│  │Staff    │  └──────────────┘                       │
│  └─────────┘                                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    DATA PERSISTENCE LAYER                │
│  (Database Class - localStorage)                        │
│                                                          │
│  ┌─────────────────┐  ┌─────────────────┐            │
│  │ railway_trains  │  │railway_bookings │            │
│  │    (JSON)       │  │     (JSON)      │            │
│  └─────────────────┘  └─────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

1. **Presentation Layer (HTML)**
   - User interface
   - User interactions
   - Display data

2. **Business Logic Layer (JavaScript Classes)**
   - Core functionality
   - Business rules
   - Data validation
   - Object relationships

3. **Data Persistence Layer (localStorage)**
   - Data storage
   - Data retrieval
   - JSON serialization

---

## Testing Scenarios for OOAD Demonstration

### Scenario 1: Inheritance Test
1. Create `Passenger` object
2. Verify it can access `User` methods (`getId()`, `getName()`)
3. Verify it has Passenger-specific methods (`bookTrain()`)

### Scenario 2: Encapsulation Test
1. Try to access private property directly (should fail/not work)
2. Use public getter method (should work)
3. Verify data protection

### Scenario 3: Association Test
1. Create `Booking` with `passengerId` and `trainId`
2. Verify booking links passenger and train
3. Retrieve bookings by passenger ID

### Scenario 4: Aggregation Test
1. Add multiple trains to `RailwaySystem`
2. Verify `RailwaySystem` contains trains
3. Verify trains can exist independently

### Scenario 5: Polymorphism Test
1. Create array of `User` objects containing both `Passenger` and `RailwayStaff`
2. Call `displayInfo()` on each
3. Verify different implementations work through same interface

---

## Viva Questions & Answers

### Q1: Explain Inheritance in this project.
**Answer:** Inheritance is demonstrated through the `User` base class and its child classes `Passenger` and `RailwayStaff`. Both child classes inherit common properties (`_id`, `_name`, `_email`) and methods from `User`, while also having their own specific methods. This reduces code duplication and allows for code reuse.

### Q2: What is the difference between Association and Aggregation?
**Answer:** 
- **Association:** A relationship where objects are related but can exist independently (e.g., `Booking` is associated with `Passenger` and `Train`).
- **Aggregation:** A "has-a" relationship with weak ownership (e.g., `RailwaySystem` aggregates `Train[]` - trains can exist without the system, but the system contains them).

### Q3: How is Encapsulation implemented?
**Answer:** Encapsulation is implemented using private properties (prefixed with `_`) that cannot be accessed directly. Public getter and setter methods provide controlled access to these properties, ensuring data integrity and hiding internal implementation details.

### Q4: Draw the class diagram for this system.
**Answer:** See [Class Diagram](#class-diagram) section above. The diagram shows `User` as base class, `Passenger` and `RailwayStaff` extending it, `Booking` associating with both `Passenger` and `Train`, and `RailwaySystem` aggregating `Train[]` and `Booking[]`.

### Q5: Explain a use case in detail.
**Answer:** See [Use Case Descriptions](#use-case-descriptions) above. Example: UC2 (Book Ticket) describes the actor, preconditions, main flow, alternative flows, and postconditions for booking a ticket.

---

## Conclusion

This Railway Management System successfully demonstrates core OOAD principles:
- ✅ **Inheritance:** User hierarchy
- ✅ **Encapsulation:** Private properties with accessors
- ✅ **Association:** Relationships between entities
- ✅ **Aggregation:** RailwaySystem contains collections
- ✅ **Abstraction:** Base class with common interface
- ✅ **Polymorphism:** Different implementations through same interface

The system is designed for educational purposes and clearly illustrates OOAD concepts through practical implementation.

---

## File Structure

```
railway-management-system/
├── frontend/
│   ├── index.html                 # Login page
│   ├── passenger-dashboard.html   # Passenger interface
│   ├── staff-dashboard.html       # Staff interface
│   ├── style.css                  # Styling
│   └── script.js                  # All OOAD classes and logic
└── OOAD_DOCUMENTATION.md          # This file
```

