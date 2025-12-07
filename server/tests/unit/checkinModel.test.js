/*
    Reference: Jest testing setup and mock functions setup for mock test data is taken from Chat-GPT (Lines: 13-23).
    
    Jest testing package documentation available at: https://jestjs.io/docs/expect

    Jest mock functions documentation available at: https://jestjs.io/docs/mock-functions
*/

// zonesModel.test.js

const db = require('../../db.js');

// Mock db.prepare() fully
const mockRun = jest.fn();
const mockAll = jest.fn();

jest.mock('../../db', () => ({
  prepare: jest.fn(() => ({
    run: mockRun,
    all: mockAll
  })),
  transaction: jest.fn((fn) => fn) // returns the inner function
}));

const checkinModel = require('../../models/checkinModel.js');

// test 1: createCheckin()
test("createCheckin() should call INSERT for all the input data", () => {
    const checkin = { booking_id: 1, checkin_time: "13:00", auto_released: 0 };
    const result = checkinModel.createCheckin(checkin);
    expect(result).toEqual({ message: `Checkin created successfully!` });
});