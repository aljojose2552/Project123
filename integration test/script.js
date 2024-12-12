pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});


pm.test("API Info is present", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.info).to.eql("Shift Management API is running.");
});
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is an array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an("array");
});

pm.test("Each shift has required fields", function () {
    var jsonData = pm.response.json();
    jsonData.forEach(shift => {
        pm.expect(shift).to.have.property("shift_name");
        pm.expect(shift).to.have.property("start_time");
        pm.expect(shift).to.have.property("end_time");
    });
});

//post

pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Shift creation response has message and shift_id", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("message");
    pm.expect(jsonData).to.have.property("shift_id");
});

pm.test("Message confirms successful creation", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.eql("Shift created successfully");
});

