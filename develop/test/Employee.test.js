const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
  const e = new Employee();
  expect(typeof (e)).toBe("object");
});

test("Can set name with constructor arguments", () => {
  const name = "Jake";
  const e = new Employee(name);
  expect(e.name).toBe(name);
});

test("Can set id with constructor argument", () => {
  const testValue = 100;
  const e = new Employee("Foo", testValue);
  expect(e.id).toBe(testValue);
});

test("Can set email with constructor argument", () => {
  const testValue = "test@test.com";
  const e = new Employee("Foo", 1, testValue);
  expect(e.email).toBe(testValue);
});

test("Can get name with getName()", () => {
  const testValue = "Jake";
  const e = new Employee(testValue);
  expect(e.getName()).toBe(testValue);
});

test("Can get id with getId()", () => {
  const testValue = 100;
  const e = new Employee("Foo", testValue);
  expect(e.getId()).toBe(testValue);
});

test("Can get email with getEmail()", () => {
  const testValue = "test@test.com";
  const e = new Employee("Foo", 1, testValue);
  expect(e.getEmail()).toBe(testValue);
});

test("getRole() should return \"Employee\"", () => {
  const testValue = "Employee";
  const e = new Employee("Jake", 1, "test@test.com");
  expect(e.getRole()).toBe(testValue);
});