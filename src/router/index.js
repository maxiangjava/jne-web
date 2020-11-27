import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export  default new Router({
    mode:"history",
    routes:[
        {
            path : "/",
            name : "登录",
            component : () => import("../views/Login")
        },
        {
            path : "/login",
            name : "登录",
            component : () => import("../views/Login")
        },
        {
            path : "/test",
            name : "测试",
            component : () => import("../views/Test")
        },
        {
            path : "/demo/demo1",
            name : "测试",
            component : () => import("../views/demo/Demo1")
        },
        {
            path : "/index",
            name : "主页",
            component : () => import("../views/Index"),
            children:[
                {
                    path : "/home",
                    name : "首页",
                    component : () => import("../views/home/Home")
                },
                {
                    path : "/employee/baseInfo",
                    name : "人员管理 > 人员信息",
                    component : () => import("../views/employee/BaseInfo")
                },
                {
                    path : "/employee/addEmployee",
                    name : "人员管理 > 基本信息 > 添加员工",
                    component : () => import("../views/employee/AddEmployee")
                },
                {
                    path : "/employee/editEmployee",
                    name : "人员管理 > 基本信息 > 编辑员工",
                    component : () => import("../views/employee/EditEmployee")
                },
                {
                    path : "/employee/typeInfo",
                    name : "人员管理 > 类别信息",
                    component : () => import("../views/employee/TypeInfo")
                },
                {
                    path : "/vehicle/vehicleInfo",
                    name : "车辆管理 > 车辆信息管理",
                    component : () => import("../views/vehicle/VehicleInfo")
                },
                {
                    path : "/vehicle/vehicleAdd",
                    name : "车辆管理 > 添加车辆信息",
                    component : () => import("../views/vehicle/VehicleAdd")
                },
                {
                    path : "/vehicle/vehicleEdit",
                    name : "车辆管理 > 修改车辆信息",
                    component : () => import("../views/vehicle/VehicleEdit")
                },
                {
                    path : "/vehicle/vehicleOutIn",
                    name : "车辆管理 > 车辆出入查询",
                    component : () => import("../views/vehicle/VehicleOutIn")
                },
                {
                    path : "/entrance/jurisdictionSet",
                    name : "门禁管理 > 权限配置",
                    component : () => import("../views/entrance/JurisdictionSet")
                },
                {
                    path : "/entrance/groupManage",
                    name : "门禁管理 > 分组管理",
                    component : () => import("../views/entrance/GroupManage")
                },
                {
                    path : "/entrance/groupAdd",
                    name : "门禁管理 > 添加分组",
                    component : () => import("../views/entrance/GroupAdd")
                },
                {
                    path : "/entrance/strategyManage",
                    name : "门禁管理 > 策略管理",
                    component : () => import("../views/entrance/StrategyManage")
                },
                {
                    path : "/entrance/strategyAdd",
                    name : "门禁管理 > 策略添加",
                    component : () => import("../views/entrance/StrategyAdd")
                },
                {
                    path : "/entrance/employeeOutIn",
                    name : "门禁管理 > 人员出入查询",
                    component : () => import("../views/entrance/EmployeeOutIn")
                },

                {
                    path : "/visitor/visitorSubscribe",
                    name : "访客管理 > 访客预约",
                    component : () => import("../views/visitor/VisitorSubscribe")
                },
                {
                    path : "/visitor/addVisitorSubscribe",
                    name : "访客管理 > 访客预约 > 添加预约",
                    component : () => import("../views/visitor/AddVisitorSubscribe")
                },
                {
                    path : "/visitor/visitorRecord",
                    name : "访客管理 > 来访记录",
                    component : () => import("../views/visitor/VisitorRecord")
                },


            ]
        }
    ]
})