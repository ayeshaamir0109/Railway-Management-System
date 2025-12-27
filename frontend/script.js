/**
 * RAILWAY MANAGEMENT SYSTEM - OOAD IMPLEMENTATION
 * 
 * This file demonstrates Object-Oriented Analysis and Design (OOAD) concepts:
 * 1. INHERITANCE: Passenger and RailwayStaff extend User (base class)
 * 2. ENCAPSULATION: Private properties and public methods within classes
 * 3. ASSOCIATION: Passenger ↔ Booking (many-to-one relationship)
 * 4. AGGREGATION: RailwaySystem contains Trains (has-a relationship)
 * 5. ABSTRACTION: User class provides common interface
 */

// Global RailwaySystem instance (accessible across all scripts)
// Using window object to ensure global accessibility
let railwaySystem = null;

// ============================================================================
// DATABASE MANAGEMENT (JSON-based local storage)
// ============================================================================

/**
 * Database class to handle JSON storage using localStorage
 * Simulates a local JSON database for the Railway Management System
 */
class Database {
    static STORAGE_KEYS = {
        TRAINS: 'railway_trains',
        BOOKINGS: 'railway_bookings',
        USERS: 'railway_users'
    };

    /**
     * Save data to localStorage as JSON
     */
    static save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Database save error:', error);
            return false;
        }
    }

    /**
     * Load data from localStorage JSON
     */
    static load(key, defaultValue = []) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Database load error:', error);
            return defaultValue;
        }
    }

    /**
     * Clear all database data
     */
    static clear() {
        Object.values(this.STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    }
}

// ============================================================================
// OOAD CLASS 1: USER (Abstract Base Class - Demonstrates INHERITANCE)
// ============================================================================

/**
 * User - Abstract/Base class (OOAD: Inheritance & Abstraction)
 * 
 * This is the parent class that defines common properties and methods
 * for all users in the system. Both Passenger and RailwayStaff inherit from this class.
 * 
 * OOAD Concepts:
 * - INHERITANCE: Child classes (Passenger, RailwayStaff) extend this class
 * - ENCAPSULATION: Private properties (_id, _name, _email) accessed via methods
 * - ABSTRACTION: Common interface for different user types
 */
class User {
    /**
     * Constructor - Creates a User instance
     * @param {string} id - Unique identifier for the user
     * @param {string} name - User's full name
     * @param {string} email - User's email address
     */
    constructor(id, name, email) {
        // ENCAPSULATION: Private properties (prefixed with _)
        this._id = id;
        this._name = name;
        this._email = email;
    }

    // Encapsulation: Public getter methods to access private properties
    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getEmail() {
        return this._email;
    }

    // Common method available to all user types (Inheritance benefit)
    displayInfo() {
        return `User: ${this._name} (${this._email})`;
    }
}

// ============================================================================
// OOAD CLASS 2: PASSENGER (Inherits from User - Demonstrates INHERITANCE)
// ============================================================================

/**
 * Passenger - Child class (OOAD: Inheritance)
 * 
 * Inherits from User class and adds passenger-specific functionality.
 * Demonstrates single inheritance in JavaScript.
 * 
 * OOAD Concepts:
 * - INHERITANCE: Extends User class using 'extends' keyword
 * - ASSOCIATION: Has many-to-one relationship with Booking
 * - ENCAPSULATION: Private methods and properties
 */
class Passenger extends User {
    /**
     * Constructor - Creates a Passenger instance
     * @param {string} id - Passenger ID
     * @param {string} name - Passenger name
     * @param {string} email - Passenger email
     */
    constructor(id, name, email) {
        // INHERITANCE: Call parent constructor using super()
        super(id, name, email);
        this._bookings = []; // Association: Passenger has many Bookings
    }

    /**
     * Book a train ticket
     * ASSOCIATION: Creates a relationship between Passenger and Booking
     * 
     * @param {Train} train - The train to book
     * @param {RailwaySystem} system - The railway system to process booking
     * @returns {Booking|null} - Created booking or null if failed
     */
    bookTrain(train, system) {
        // Check if train has available seats
        if (train.getAvailableSeats() <= 0) {
            alert('No seats available on this train');
            return null;
        }

        // Create a new booking (ASSOCIATION: Passenger creates Booking)
        const bookingId = 'B' + Date.now().toString().slice(-8);
        const booking = new Booking(
            bookingId,
            this._id, // Association: Booking knows about Passenger
            train.getTrainId(), // Association: Booking knows about Train
            new Date().toISOString().split('T')[0],
            'PENDING'
        );

        // Add booking to system (delegation to RailwaySystem)
        const success = system.addBooking(booking);
        
        if (success) {
            this._bookings.push(bookingId);
            return booking;
        }
        
        return null;
    }

    /**
     * Get all bookings for this passenger
     * ASSOCIATION: Returns associated bookings
     * 
     * @param {RailwaySystem} system - The railway system
     * @returns {Array<Booking>} - Array of bookings
     */
    getMyBookings(system) {
        return system.getBookingsByPassenger(this._id);
    }
}

// ============================================================================
// OOAD CLASS 3: RAILWAYSTAFF (Inherits from User - Demonstrates INHERITANCE)
// ============================================================================

/**
 * RailwayStaff - Child class (OOAD: Inheritance)
 * 
 * Inherits from User class and adds staff-specific functionality.
 * Demonstrates polymorphism - same base class, different behavior.
 * 
 * OOAD Concepts:
 * - INHERITANCE: Extends User class
 * - ENCAPSULATION: Staff-specific methods and properties
 * - POLYMORPHISM: Different implementation than Passenger for same base class
 */
class RailwayStaff extends User {
    /**
     * Constructor - Creates a RailwayStaff instance
     * @param {string} id - Staff ID
     * @param {string} name - Staff name
     * @param {string} email - Staff email
     * @param {string} designation - Staff designation (e.g., "Station Master")
     */
    constructor(id, name, email, designation) {
        // INHERITANCE: Call parent constructor using super()
        super(id, name, email);
        // ENCAPSULATION: Private property specific to staff
        this._designation = designation;
    }

    getDesignation() {
        return this._designation;
    }

    /**
     * Add a new train to the system
     * AGGREGATION: Staff manages trains in the RailwaySystem
     * 
     * @param {Train} train - Train to add
     * @param {RailwaySystem} system - The railway system
     * @returns {boolean} - Success status
     */
    addTrain(train, system) {
        return system.addTrain(train);
    }

    /**
     * Update train status (e.g., change seat capacity)
     * 
     * @param {Train} train - Train to update
     * @param {number} newTotalSeats - New total seat count
     * @param {RailwaySystem} system - The railway system
     * @returns {boolean} - Success status
     */
    updateTrainStatus(train, newTotalSeats, system) {
        if (newTotalSeats < train.getBookedSeats()) {
            alert('Cannot reduce seats below booked count');
            return false;
        }
        train.setTotalSeats(newTotalSeats);
        return system.updateTrain(train);
    }

    /**
     * Delete a train from the system
     * 
     * @param {string} trainId - ID of train to delete
     * @param {RailwaySystem} system - The railway system
     * @returns {boolean} - Success status
     */
    deleteTrain(trainId, system) {
        return system.removeTrain(trainId);
    }

    /**
     * Issue/Confirm a booking (change status from PENDING to CONFIRMED)
     * 
     * @param {Booking} booking - Booking to confirm
     * @param {RailwaySystem} system - The railway system
     * @returns {boolean} - Success status
     */
    issueBooking(booking, system) {
        if (booking.getStatus() !== 'PENDING') {
            alert('Only pending bookings can be confirmed');
            return false;
        }

        const train = system.getTrainById(booking.getTrainId());
        if (!train || train.getAvailableSeats() <= 0) {
            alert('No seats available');
            return false;
        }

        // Assign seat number
        const seatNumber = train.getTotalSeats() - train.getAvailableSeats() + 1;
        booking.setSeatNumber(seatNumber);
        booking.setStatus('CONFIRMED');
        
        // Update train's booked seats
        train.bookSeat();
        
        return system.updateBooking(booking) && system.updateTrain(train);
    }

    /**
     * Process return/cancellation of a booking
     * 
     * @param {Booking} booking - Booking to process return for
     * @param {RailwaySystem} system - The railway system
     * @returns {boolean} - Success status
     */
    processReturn(booking, system) {
        if (booking.getStatus() !== 'CONFIRMED') {
            alert('Only confirmed bookings can be returned');
            return false;
        }

        booking.setStatus('RETURNED');
        
        const train = system.getTrainById(booking.getTrainId());
        if (train) {
            train.releaseSeat();
            system.updateTrain(train);
        }
        
        return system.updateBooking(booking);
    }
}

// ============================================================================
// OOAD CLASS 4: TRAIN (Domain Entity - Demonstrates ENCAPSULATION)
// ============================================================================

/**
 * Train - Domain entity class (OOAD: Encapsulation)
 * 
 * Represents a train in the railway system.
 * 
 * OOAD Concepts:
 * - ENCAPSULATION: Private properties with public getters/setters
 * - Single Responsibility: Only manages train-specific data and behavior
 */
class Train {
    /**
     * Constructor - Creates a Train instance
     * @param {string} trainId - Unique train identifier
     * @param {string} trainName - Name of the train
     * @param {string} source - Source station
     * @param {string} destination - Destination station
     * @param {string} departureDate - Departure date (YYYY-MM-DD)
     * @param {string} departureTime - Departure time (HH:MM)
     * @param {number} totalSeats - Total number of seats
     */
    constructor(trainId, trainName, source, destination, departureDate, departureTime, totalSeats) {
        // ENCAPSULATION: Private properties
        this._trainId = trainId;
        this._trainName = trainName;
        this._source = source;
        this._destination = destination;
        this._departureDate = departureDate;
        this._departureTime = departureTime;
        this._totalSeats = totalSeats;
        this._bookedSeats = 0;
    }

    // Encapsulation: Getter methods
    getTrainId() {
        return this._trainId;
    }

    getTrainName() {
        return this._trainName;
    }

    getSource() {
        return this._source;
    }

    getDestination() {
        return this._destination;
    }

    getDepartureDate() {
        return this._departureDate;
    }

    getDepartureTime() {
        return this._departureTime;
    }

    getTotalSeats() {
        return this._totalSeats;
    }

    getBookedSeats() {
        return this._bookedSeats;
    }

    getAvailableSeats() {
        return this._totalSeats - this._bookedSeats;
    }

    // Encapsulation: Setter methods
    setTotalSeats(seats) {
        if (seats >= this._bookedSeats) {
            this._totalSeats = seats;
            return true;
        }
        return false;
    }

    bookSeat() {
        if (this._bookedSeats < this._totalSeats) {
            this._bookedSeats++;
            return true;
        }
        return false;
    }

    releaseSeat() {
        if (this._bookedSeats > 0) {
            this._bookedSeats--;
            return true;
        }
        return false;
    }

    /**
     * Convert Train object to plain object for JSON storage
     */
    toJSON() {
        return {
            trainId: this._trainId,
            trainName: this._trainName,
            source: this._source,
            destination: this._destination,
            departureDate: this._departureDate,
            departureTime: this._departureTime,
            totalSeats: this._totalSeats,
            bookedSeats: this._bookedSeats
        };
    }

    /**
     * Create Train object from plain object (for loading from JSON)
     */
    static fromJSON(data) {
        const train = new Train(
            data.trainId,
            data.trainName,
            data.source,
            data.destination,
            data.departureDate,
            data.departureTime,
            data.totalSeats
        );
        train._bookedSeats = data.bookedSeats || 0;
        return train;
    }
}

// ============================================================================
// OOAD CLASS 5: BOOKING (Domain Entity - Demonstrates ASSOCIATION)
// ============================================================================

/**
 * Booking - Domain entity class (OOAD: Association)
 * 
 * Represents a booking/ticket in the railway system.
 * 
 * OOAD Concepts:
 * - ASSOCIATION: Links Passenger and Train (many-to-one relationships)
 * - ENCAPSULATION: Private properties with controlled access
 */
class Booking {
    /**
     * Constructor - Creates a Booking instance
     * @param {string} bookingId - Unique booking identifier
     * @param {string} passengerId - ID of the passenger (ASSOCIATION with Passenger)
     * @param {string} trainId - ID of the train (ASSOCIATION with Train)
     * @param {string} bookingDate - Date of booking (YYYY-MM-DD)
     * @param {string} status - Booking status (PENDING, CONFIRMED, RETURNED, CANCELLED)
     */
    constructor(bookingId, passengerId, trainId, bookingDate, status = 'PENDING') {
        // ENCAPSULATION: Private properties
        this._bookingId = bookingId;
        this._passengerId = passengerId; // ASSOCIATION: Reference to Passenger
        this._trainId = trainId; // ASSOCIATION: Reference to Train
        this._bookingDate = bookingDate;
        this._status = status;
        this._seatNumber = null;
    }

    // Encapsulation: Getter methods
    getBookingId() {
        return this._bookingId;
    }

    getPassengerId() {
        return this._passengerId;
    }

    getTrainId() {
        return this._trainId;
    }

    getBookingDate() {
        return this._bookingDate;
    }

    getStatus() {
        return this._status;
    }

    getSeatNumber() {
        return this._seatNumber;
    }

    // Encapsulation: Setter methods
    setStatus(status) {
        const validStatuses = ['PENDING', 'CONFIRMED', 'RETURNED', 'CANCELLED'];
        if (validStatuses.includes(status)) {
            this._status = status;
            return true;
        }
        return false;
    }

    setSeatNumber(seatNumber) {
        this._seatNumber = seatNumber;
    }

    /**
     * Convert Booking object to plain object for JSON storage
     */
    toJSON() {
        return {
            bookingId: this._bookingId,
            passengerId: this._passengerId,
            trainId: this._trainId,
            bookingDate: this._bookingDate,
            status: this._status,
            seatNumber: this._seatNumber
        };
    }

    /**
     * Create Booking object from plain object (for loading from JSON)
     */
    static fromJSON(data) {
        const booking = new Booking(
            data.bookingId,
            data.passengerId,
            data.trainId,
            data.bookingDate,
            data.status
        );
        if (data.seatNumber) {
            booking.setSeatNumber(data.seatNumber);
        }
        return booking;
    }
}

// ============================================================================
// OOAD CLASS 6: RAILWAYSYSTEM (Aggregate Root - Demonstrates AGGREGATION)
// ============================================================================

/**
 * RailwaySystem - Aggregate root class (OOAD: Aggregation & Composition)
 * 
 * Manages all trains and bookings in the system.
 * Demonstrates aggregation - "has-a" relationship with Trains and Bookings.
 * 
 * OOAD Concepts:
 * - AGGREGATION: RailwaySystem "has" Trains and Bookings (weak ownership)
 * - ENCAPSULATION: Manages collections internally
 * - SINGLETON PATTERN: Single instance manages entire system
 * - PERSISTENCE: Integrates with JSON database
 */
class RailwaySystem {
    /**
     * Constructor - Creates a RailwaySystem instance
     */
    constructor() {
        // AGGREGATION: System contains collections of Trains and Bookings
        this._trains = [];
        this._bookings = [];
        
        // Load data from JSON database
        this.loadFromDatabase();
    }

    /**
     * Load trains and bookings from JSON database (localStorage)
     */
    loadFromDatabase() {
        // Load trains from JSON
        const trainData = Database.load(Database.STORAGE_KEYS.TRAINS, []);
        this._trains = trainData.map(data => Train.fromJSON(data));

        // Load bookings from JSON
        const bookingData = Database.load(Database.STORAGE_KEYS.BOOKINGS, []);
        this._bookings = bookingData.map(data => Booking.fromJSON(data));

        // Sync booked seats count with actual bookings
        this._syncBookedSeats();
    }

    /**
     * Save trains and bookings to JSON database (localStorage)
     */
    saveToDatabase() {
        // Convert trains to JSON and save
        const trainData = this._trains.map(train => train.toJSON());
        Database.save(Database.STORAGE_KEYS.TRAINS, trainData);

        // Convert bookings to JSON and save
        const bookingData = this._bookings.map(booking => booking.toJSON());
        Database.save(Database.STORAGE_KEYS.BOOKINGS, bookingData);
    }

    /**
     * Synchronize booked seats count with actual confirmed bookings
     */
    _syncBookedSeats() {
        // Reset all booked seats
        this._trains.forEach(train => {
            train._bookedSeats = 0;
        });

        // Count confirmed bookings per train
        this._bookings.forEach(booking => {
            if (booking.getStatus() === 'CONFIRMED') {
                const train = this.getTrainById(booking.getTrainId());
                if (train) {
                    train._bookedSeats++;
                }
            }
        });
    }

    // ========== TRAIN MANAGEMENT METHODS ==========

    /**
     * Add a train to the system
     * AGGREGATION: System "owns" trains
     * 
     * @param {Train} train - Train to add
     * @returns {boolean} - Success status
     */
    addTrain(train) {
        // Check if train ID already exists
        if (this.getTrainById(train.getTrainId())) {
            alert('Train with this ID already exists');
            return false;
        }

        this._trains.push(train);
        this.saveToDatabase();
        return true;
    }

    /**
     * Get train by ID
     * 
     * @param {string} trainId - Train ID
     * @returns {Train|null} - Train object or null
     */
    getTrainById(trainId) {
        return this._trains.find(train => train.getTrainId() === trainId) || null;
    }

    /**
     * Get all trains
     * AGGREGATION: Returns aggregated trains
     * 
     * @returns {Array<Train>} - Array of all trains
     */
    getAllTrains() {
        return [...this._trains]; // Return copy to maintain encapsulation
    }

    /**
     * Update train in the system
     * 
     * @param {Train} train - Updated train object
     * @returns {boolean} - Success status
     */
    updateTrain(train) {
        const index = this._trains.findIndex(t => t.getTrainId() === train.getTrainId());
        if (index !== -1) {
            this._trains[index] = train;
            this.saveToDatabase();
            return true;
        }
        return false;
    }

    /**
     * Remove train from the system
     * 
     * @param {string} trainId - Train ID to remove
     * @returns {boolean} - Success status
     */
    removeTrain(trainId) {
        // Check if train has active bookings
        const activeBookings = this._bookings.filter(
            booking => booking.getTrainId() === trainId && 
                      (booking.getStatus() === 'PENDING' || booking.getStatus() === 'CONFIRMED')
        );

        if (activeBookings.length > 0) {
            alert('Cannot delete train with active bookings');
            return false;
        }

        const index = this._trains.findIndex(t => t.getTrainId() === trainId);
        if (index !== -1) {
            this._trains.splice(index, 1);
            this.saveToDatabase();
            return true;
        }
        return false;
    }

    // ========== BOOKING MANAGEMENT METHODS ==========

    /**
     * Add a booking to the system
     * AGGREGATION: System "owns" bookings
     * 
     * @param {Booking} booking - Booking to add
     * @returns {boolean} - Success status
     */
    addBooking(booking) {
        // Check if booking ID already exists
        if (this.getBookingById(booking.getBookingId())) {
            return false;
        }

        this._bookings.push(booking);
        this.saveToDatabase();
        return true;
    }

    /**
     * Get booking by ID
     * 
     * @param {string} bookingId - Booking ID
     * @returns {Booking|null} - Booking object or null
     */
    getBookingById(bookingId) {
        return this._bookings.find(booking => booking.getBookingId() === bookingId) || null;
    }

    /**
     * Get all bookings
     * AGGREGATION: Returns aggregated bookings
     * 
     * @returns {Array<Booking>} - Array of all bookings
     */
    getAllBookings() {
        return [...this._bookings]; // Return copy to maintain encapsulation
    }

    /**
     * Get bookings by passenger ID
     * ASSOCIATION: Finds bookings associated with a passenger
     * 
     * @param {string} passengerId - Passenger ID
     * @returns {Array<Booking>} - Array of bookings
     */
    getBookingsByPassenger(passengerId) {
        return this._bookings.filter(booking => booking.getPassengerId() === passengerId);
    }

    /**
     * Update booking in the system
     * 
     * @param {Booking} booking - Updated booking object
     * @returns {boolean} - Success status
     */
    updateBooking(booking) {
        const index = this._bookings.findIndex(b => b.getBookingId() === booking.getBookingId());
        if (index !== -1) {
            this._bookings[index] = booking;
            this.saveToDatabase();
            return true;
        }
        return false;
    }

    /**
     * Cancel a booking
     * 
     * @param {string} bookingId - Booking ID to cancel
     * @returns {boolean} - Success status
     */
    cancelBooking(bookingId) {
        const booking = this.getBookingById(bookingId);
        if (!booking) {
            return false;
        }

        if (booking.getStatus() === 'CANCELLED' || booking.getStatus() === 'RETURNED') {
            alert('Booking is already cancelled or returned');
            return false;
        }

        // Release seat if booking was confirmed
        if (booking.getStatus() === 'CONFIRMED') {
            const train = this.getTrainById(booking.getTrainId());
            if (train) {
                train.releaseSeat();
                this.updateTrain(train);
            }
        }

        booking.setStatus('CANCELLED');
        return this.updateBooking(booking);
    }
}

// Initialize the RailwaySystem when script loads
// Make it explicitly global by attaching to window object
if (typeof window !== 'undefined') {
    railwaySystem = new RailwaySystem();
    window.railwaySystem = railwaySystem; // Explicitly global for cross-script access
}

