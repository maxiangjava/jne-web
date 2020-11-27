const format = {
     genderFormat(row){//性别翻译
        if (row.gender == 1) {
            return '男'
        } else if (row.gender == 2) {
            return '女'
        } else {
            return row.gender
        }
    },
    carColorFormat(row){//车辆颜色翻译
        const dict = JSON.parse(sessionStorage.getItem('carColor'));
        if(dict){
            for (let i=0;i<dict.length;i++){
                if(row.vehicleColor == dict[i].key){
                    return dict[i].value
                }
            }
        }

    },
    plateColorFormat(row){//车牌颜色翻译
        const dict = JSON.parse(sessionStorage.getItem('plateColor'));
        if(dict){
            for (let i=0;i<dict.length;i++){
                if(row.plateColor == dict[i].key){
                    return dict[i].value
                }
            }
        }

    },
    plateTypeFormat(row){//车牌类型翻译
        const dict = JSON.parse(sessionStorage.getItem('plateType'));
        if(dict){
            for (let i=0;i<dict.length;i++){
                if(row.plateType == dict[i].key){
                    return dict[i].value
                }
            }
        }

    },
    vehicleTypeFormat(row){//车辆类型翻译
        const dict = JSON.parse(sessionStorage.getItem('carType'));
        if(dict){
            for (let i=0;i<dict.length;i++){
                if(row.vehicleType == dict[i].key){
                    return dict[i].value
                }
            }
        }
    },

    nationFormat(row){//民族类型翻译
        const dict = JSON.parse(sessionStorage.getItem('nation'));
        if(dict){
            for (let i=0;i<dict.length;i++){
                if(row.nation == dict[i].key){
                    return dict[i].value
                }
            }
        }
    },

    startTimeFormat (row) {
        let time = new Date(row.startTime)
        let year = time.getFullYear()
        const month = (time.getMonth() + 1).toString().padStart(2, '0')
        const date = (time.getDate()).toString().padStart(2, '0')
        const hours = (time.getHours()).toString().padStart(2, '0')
        const minute = (time.getMinutes()).toString().padStart(2, '0')
        const second = (time.getSeconds()).toString().padStart(2, '0')
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
    },
    endTimeFormat (row) {
        let time = new Date(row.endTime)
        let year = time.getFullYear()
        const month = (time.getMonth() + 1).toString().padStart(2, '0')
        const date = (time.getDate()).toString().padStart(2, '0')
        const hours = (time.getHours()).toString().padStart(2, '0')
        const minute = (time.getMinutes()).toString().padStart(2, '0')
        const second = (time.getSeconds()).toString().padStart(2, '0')
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
    },

    schoolAreaFormat (row) {
        let name = ''
        if(row.schoolArea){
            let aa = row.schoolArea
            console.log(aa)
            let bb = aa.slice(',')
            console.log(bb)
            console.log(bb.length)
            console.log('-----------')

            let dptList = JSON.parse(sessionStorage.getItem('dptList'))
            deep(dptList)
            return  name
        }
        function deep(list) {
            for (var i = 0; i < list.length; i++) {
                if(row.schoolArea == list[i].orgIndexCode){
                    name = list[i].orgName
                }else{
                    if(list[i].children){
                        deep(list[i].children)
                    }
                }
            }
        }

    },
    typeFormat(row){//车辆类型翻译
       if(row.type == 1){
           return '正常'
       }else if(row.type == 2){
           return '迟到'
       }else{
           return '失效'
       }

    },
}
export default format