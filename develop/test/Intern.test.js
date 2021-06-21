const Intern = require("../lib/Intern");

test("Can set school via constructor", () => {
    const testValue = "Student";
    const e = new Intern("Foo", 1, "test@test.com", testValue);
    expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
    const testValue = "Intern";
    const e = new Intern("Foo", 1, "test@test.com", "Student");
    expect(e.getRole()).toBe(testValue);
});

test("Can get school with getSchool()", () => {
    const testValue = "Student";
    const e = new Intern("Foo", 1, "test@test.com", testValue);
    expect(e.getSchool()).toBe(testValue);
});