/*
    Reference: Jest testing setup and mock functions setup for mock test data is taken from Chat-GPT (Lines: 16-25).
    
    Jest testing package documentation available at: https://jestjs.io/docs/expect

    Jest mock functions documentation available at: https://jestjs.io/docs/mock-functions

    This is jest unit tests file for zone model funtions.
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

const zonesModel = require('../../models/zonesModels.js');

// test 1: createZone()
test("createZone() should call INSERT for all the input data", () => {
    const zones = [
      { zone_id: 1, zone_name: "A", floor: 1, description: "Test1" },
      { zone_id: 2, zone_name: "B", floor: 2, description: "Test2" }
    ];
    const result = zonesModel.createZones(zones);
    expect(result).toEqual({ message: "2 zones created successfully" });
});


//MARK: package.json config for jest
//"jest --runTestsByPath tests/unit"
//"jest --runTestsByPath tests/integration"