
var ViewModels = function () {
    var self = this;
    self.students = ko.observableArray([]);
    self.error = ko.observable();
    self.id = ko.observable();
    self.codeView = ko.observable();
    self.name = ko.observable();
    self.address = ko.observable();
    self.dateOfBirtd = ko.observable();
    self.phone = ko.observable();
    self.idClasses = ko.observable();
    self.Classes = ko.observable();

    var studentsUri = '/api/students/';
    var classUri = '/api/classes';




    function ajaxHelper(uri, method, data) {
        self.error(''); //clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }
    function clearFields() {
        $("#codeview").val("");
        $("#name").val("");
        $("#address").val("");
        $("#phone").val("");
        $("#dateOfBirtd").val("");
        $("#AddST").hide();
    }

    function getAllStudents() {
        ajaxHelper(studentsUri, 'GET').done(function (data) {
            self.students(data);
        });
    }
    getAllStudents();


    var checkValidate = function () {
        if ($("#codeview").val() === '' || $("#codeview").val().length !== 8) {
            $("#errorCodeView").show(2500).hide(2500);
            return false;
        }
    };

    self.newStudent = {
        id: ko.observable(),
        codeView: ko.observable(),
        name: ko.observable(),
        address: ko.observable(),
        phone: ko.observable(),
        dateOfBirtd: ko.observable(),
        Classes: ko.observable()
    };


    self.AddStudent = function AddStudent(formElement) {
        checkValidate();
        var student = {
            codeView: self.newStudent.codeView(),
            name: self.newStudent.name(),
            address: self.newStudent.address(),
            dateOfBirtd: self.newStudent.dateOfBirtd(),
            phone: self.newStudent.phone(),
            idClasses: self.newStudent.Classes()
        };
        ajaxHelper(studentsUri, 'POST', student).done(function (item) {
            self.students.push(item);
            alert("Success");
            clearFields();
            getAllStudents();
        });

    };
    self.updateStudent = function () {
        var oldStudent = {
            id: $("#id-UD").val(),
            codeView: $("#codeview-UD").val(),
            name: $("#name-UD").val(),
            address: $("#address-UD").val(),
            dateOfBirtd: $("#dateofbirtd-UD").val(),
            phone: $("#phone-UD").val(),
            idClasses: $("#idClasses-UD").val()
            //id: self.newStudent.id(),
            //codeView: self.newStudent.codeView(), 
            //name: self.newStudent.name(),  
            //address: self.newStudent.address(), 
            //dateOfBirtd: self.newStudent.dateOfBirtd(),
            //phone: self.newStudent.phone(), 
            //idClasses: self.newStudent.Classes().id 
        };
        ajaxHelper(studentsUri + oldStudent.id, 'PUT', oldStudent).done(function () {
            alert("Update student success.");
            $("#UpdateForm").hide();
            $("#UpdateLB").hide();
            clearFields();
            $("#Add").show();
            getAllStudents();
        });
    };

    self.GetDataToTB = function (item) {
        $("#Add").hide();
        $("#AddST").hide();
        $("#UpdateForm").show();
        $("#UpdateLB").show();

        $("#id-UD").val(item.id);
        $("#codeview-UD").val(item.codeView);
        $("#name-UD").val(item.name);
        $("#address-UD").val(item.address);
        //$("#dateOfBirtd-UD").val(item.dateOfBirtd);
        $("#phone-UD").val(item.phone);
        $("#idClasses-UD").val(item.idClasses);
        //self.id(item.id); 
        //self.codeView(item.codeView); 
        //self.name(item.name); 
        //self.address(item.address);
        self.dateOfBirtd(item.dateOfBirtd); 
        //self.phone(item.phone); 
        //self.idClasses(item.idClasses);  
        

    };
    self.DeleteStudent = function (item) {
        var rs = confirm("Are you sure?");
        if (rs === true) {
            ajaxHelper(studentsUri + item.id, 'DELETE').done(function () {
                alert("Success");
                getAllStudents();
            });
        }

    };
    self.listClass = ko.observableArray();
    var getAllClass = function () {
        ajaxHelper(classUri, 'GET').done(function (data) {
            self.listClass(data);
        });
    };
    getAllClass();

   
    //var getAllClassName = function (id) {
    //    ajaxHelper(classUri + id, 'GET').done(function (data) {
    //        return data.name;
    //    });
    //};
    //getAllClassName();
};


$(document).ready(function () {
    $("#AddST").hide();
    $("#UpdateLB").hide();
    $("#UpdateForm").hide();

    $("#Add").click(function () {
        $("#AddST").toggle();
        $("#UpdateForm").hide();
        $("#errorCodeView").hide();
        $("#errorLoop").hide();
    });
    $("#actionCancel").click(function () {
        $("#AddST").hide();

    });
    $("#update").click(function () {

    });
    $("#actionCancelUD").click(function () {
        $("#UpdateLB").hide();
        $("#Add").show();
        $("#UpdateForm").hide();
    });
    ko.applyBindings(new ViewModels());
    console.log(new ViewModels(self.students));
});