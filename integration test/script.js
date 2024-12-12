pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("API Info is present", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.info).to.eql("Shift Management API is running.");
});
