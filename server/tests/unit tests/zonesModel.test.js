/*
    Reference: Jest testing setup and mock functions setup for mock test data is taken from Chat-GPT (Lines: 13-26)
    
    Jest testing package documentation available at: https://jestjs.io/docs/expect

    Jest mock functions documentation available at: https://jestjs.io/docs/mock-functions
*/

// zonesModel.test.js

const db = require('../../db');

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

