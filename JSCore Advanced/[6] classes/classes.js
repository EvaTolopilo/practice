class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }

    getsalary() {
        return this.salary * 12;
    }
}

class Manager extends Employee {
    constructor(name, salary, department) {
        super(name, salary);
        this.department = department;
    }

    getsalary() {
        return super.getsalary() + (this.salary * 0.1); // Бонус 10%
    }
}

const manager1 = new Manager("Иван", 50000, "Продажи");
const manager2 = new Manager("Анна", 60000, "Маркетинг");

console.log(manager1.getsalary());
console.log(manager2.getsalary());

