class employee {
    constructor() {
        this.collections = {};
    }
    createCollection(collectionName) {
        this.collections[collectionName] = [];
        console.log(`Collection '${collectionName}' created.`);
    }
    indexData(collectionName, excludeColumn) {
        const employees = [
            { EmployeeID: 'E101', Name: 'Arun', Department: 'IT', Gender: 'Male' },
            { EmployeeID: 'E102', Name: 'Selvi', Department: 'HR', Gender: 'Female' },
            { EmployeeID: 'E103', Name: 'Dhina', Department: 'Sales', Gender: 'Male' },
            { EmployeeID: 'E104', Name: 'Ajithkumar', Department: 'Finance', Gender: 'Male' },
            { EmployeeID: 'E105', Name: 'Shankari', Department: 'IT', Gender: 'Female'},
        ];
        employees.forEach(emp => {
            if (excludeColumn in emp) {
                delete emp[excludeColumn];}
            this.collections[collectionName].push(emp);
        });
        console.log(`Data indexed in collection '${collectionName}', excluding column '${excludeColumn}'.`);
    }
    searchByColumn(collectionName, columnName, columnValue) {
        const results = this.collections[collectionName].filter(emp => emp[columnName] === columnValue);
        console.log(`Search results in '${collectionName}' for '${columnName} = ${columnValue}':`, results);
        return results;
    }
    getEmpCount(collectionName) {
        const count = this.collections[collectionName].length;
        console.log(`Employee count in '${collectionName}': ${count}`);
        return count;
    }
    delEmpById(collectionName, employeeId) {
        const initialCount = this.collections[collectionName].length;
        this.collections[collectionName] = this.collections[collectionName].filter(emp => emp.EmployeeID !== employeeId);
        const finalCount = this.collections[collectionName].length;
        console.log(`Deleted employee ID '${employeeId}' from '${collectionName}'. Changes made: ${initialCount - finalCount}`);
    }
    getDepFacet(collectionName) {
        const departmentCount = {};
        this.collections[collectionName].forEach(emp => {
            const dept = emp.Department || 'Unknown';
            departmentCount[dept] = (departmentCount[dept] || 0) + 1;
        });
        console.log(`Department facet for '${collectionName}':`, departmentCount);
        return departmentCount;
    }
}

const collectionManager = new employee();

const v_nameCollection = 'Arun';  
const v_phoneCollection = '5627';  
collectionManager.createCollection(v_nameCollection);
collectionManager.createCollection(v_phoneCollection);
collectionManager.getEmpCount(v_nameCollection);
collectionManager.indexData(v_nameCollection, 'Department');
collectionManager.indexData(v_phoneCollection, 'Gender');
collectionManager.delEmpById(v_nameCollection, 'E102');
collectionManager.getEmpCount(v_nameCollection);
collectionManager.searchByColumn(v_nameCollection, 'Department', 'IT');
collectionManager.searchByColumn(v_nameCollection, 'Gender', 'Male');
collectionManager.searchByColumn(v_phoneCollection, 'Department', 'IT');

collectionManager.getDepFacet(v_nameCollection);
collectionManager.getDepFacet(v_phoneCollection);
