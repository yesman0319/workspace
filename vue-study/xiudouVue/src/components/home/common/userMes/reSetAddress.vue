<template>
    <div id="reSetAddress" v-if="isShow">
        <div class="title" flex="main:justify">
            <p class="pink">添加/修改地址</p>
            <img src="/static/img/qrcode_close.png" alt="" @click="close">
        </div>
        <div class="userMes">
            <ul flex="dir:top" style="flex-wrap: wrap">
                <li flex="dir:left">
                    <label>姓名:</label>
                    <input type="text" ref="name" v-if="editAddress" :value="editAddress.name">
                    <input type="text" ref="name" v-else>
                </li>
                <li flex="dir:left">
                    <label>手机号:</label>
                    <input type="text" ref="phone" v-if="editAddress" :value="editAddress.phone_number">
                    <input type="text" ref="phone" v-else>
                </li>
                <li flex="dir:left" style="position: relative">
                    <label>所在地址:</label>
                    <input type="text" ref="address" v-if="editAddress" :value="addressText || editAddress.location" @click="takeAddressList">
                    <input type="text" ref="address" :value="addressText" @click="takeAddressList" v-else>
                    <img src="/static/img/p_buttom.png" alt="">
                    <div class="addressList" v-if="addressShow">
                        <ul>
                            <li v-for="(address,index) of province" @click="makeAddressArray(index)">
                                {{address.district_name}}
                            </li>
                        </ul>
                    </div>
                </li>
                <li flex="dir:left" style="height: 125px">
                    <label>详细地址:</label>
                    <textarea type="text" ref="addressMes" v-if="editAddress" :value="editAddress.address"></textarea>
                    <textarea type="text" ref="addressMes" v-else></textarea>
                </li>
                <li flex="dir:left">
                    <label>邮政编码:</label>
                    <input type="text" ref="zipCode" v-if="editAddress" :value="editAddress.post_code">
                    <input type="text" ref="zipCode" v-else>
                </li>
            </ul>
            <button class="sortButton" style='background: #ddd' @click="close" v-if="!editAddress">取消</button>
            <button class="sortButton" style='background: #000' @click="delAddress" v-else>删除</button>
            <button class="sortButton" @click="save">保存</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'reSetAddress',
        data () {
            return {
                province: '',
                addressShow: false,
                addressNumArray: [],
                addressText: '',
                addressId: 1
            }
        },
        props:['editAddress'],
        computed: {
            isShow(){
                return this.$store.state.addressStatus.isShow;
            }
        },
        mounted(){
        },
        methods: {
            save(){
                let name = this.$refs.name.value,
                    phone = this.$refs.phone.value,
                    address = this.addressNumArray,
                    addressMes = this.$refs.addressMes.value,
                    zipCode = this.$refs.zipCode.value,
                    addressObj = {
                        name,
                        phone,
                        address,
                        addressMes,
                        zipCode
                    }
                if(!name){this.alertS("姓名不能为空" )}
                else if(!util.isName(name)){this.alertS("请输入正确的姓名")}
                else if(!phone){this.alertS("手机号不能为空")}
                else if(util.isPhoneNumber(phone) != 'success'){this.alertS("请输入正确的手机号")}
                else if(!address.length){this.alertS("地址不能为空")}
                else if(!addressMes){this.alertS("详细地址不能为空")}
                else if(!zipCode){this.alertS("邮编不能为空")}
                else if(!util.isZipCode(zipCode)){this.alertS("邮编格式不正确")}
                else{
                    if(this.editAddress){
                        this.writeAddress('user/edit_address',addressObj,this.editAddress.id)
                    }else{
                        this.writeAddress('user/add_address',addressObj)
                    }
                    this.close();
                }
            },
            close(){
                this.$store.commit("ADDRESS_CHANGE",false);
                this.addressText = '';
                this.addressShow = false;
                this.$emit('changeAddressList')
            },
            delAddress(){
                util.ajaxGet(this, '1.0', 'user/del_address', {'auth_token': AUTH_TOKEN,"id": this.editAddress.id}, (res) => {
                    if (res.body.code == 0) {
                        this.$store.commit("ALERT_CHANGE", {
                            status: true,
                            errText: "删除成功",
                            imgStatus: false
                        });
                        localStorage.setItem('addressList',JSON.stringify(res.body.list))
                    }else{
                        this.$store.commit("ALERT_CHANGE", {
                            status: true,
                            errText: "操作失败",
                            imgStatus: true
                        });
                    }
                    this.close()
                })
            },
            alertS(errText){
                this.$store.commit("ALERT_CHANGE", {
                    status: true,
                    errText: errText,
                    imgStatus: true
                });
                return false
            },
            writeAddress(urlName,addressObj,id){
                util.ajaxPost(this, '1.0', urlName , {
                    auth_token: AUTH_TOKEN,
                    name: addressObj.name,
                    address_array: addressObj.address,
                    address_detail: addressObj.addressMes,
                    post_code: addressObj.zipCode,
                    phone_number: addressObj.phone,
                    id: id
                }, (res) => {
                    if(this.editAddress){
                        this.$store.commit("ALERT_CHANGE", {
                            status: true,
                            errText:res.body.message || '您未做任何修改',
                            imgStatus: false
                        });
                        localStorage.setItem('addressList',JSON.stringify(res.body.list))
                    }else{
                        if(res.body.code == 0){
                            localStorage.setItem('addressList',JSON.stringify(res.body.list))
                            this.$store.commit("ALERT_CHANGE", {
                                status: true,
                                errText:'添加成功',
                                imgStatus: false
                            });
                        }else{
                            this.$store.commit("ALERT_CHANGE", {
                                status: true,
                                errText:'添加失败',
                                imgStatus: false
                            });
                        }
                    }
                })
            },
            takeAddressList(){
                if(this.editAddress){
                    this.editAddress.location = '';
                }
                if (this.addressShow == false) {
                    this.addressText = '';
                    this.addressNumArray = [];
                    this.addressId = 1;
                }
                this.addressShow = true;

                if (this.addressNumArray.length <= 2) {
                    this.takeAddressMes(this.addressId);
                } else {
                    this.addressShow = false;
                }
            },
            takeAddressMes(id){
                util.ajaxGet(this, '1.0', 'user/district_list', {"district_id": id}, (res) => {
                    if (res.body.code == 0) {
                        this.province = res.body.data;
                    }
                })
            },
            makeAddressArray(index){
                this.addressId = this.province[index].district_id;
                this.addressNumArray.push(this.province[index].district_id);
                this.addressText += this.province[index].district_name;
                this.takeAddressList()
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #reSetAddress{
        position: absolute;
        top: -20px;
        right:-40px;
        height: 860px;
        width: 420px;
        padding:40px;
        border:1px solid #ddd;
        background: #fff;
    }
    .title {
        img {
            height: 25px;
            width: 25px;
            margin-top: 10px;
        }
    }

    .userMes {
        ul {
            border-top: 2px solid #ddd;
            li {
                height: 40px;
                border-bottom: 1px solid #dddddd;
                input {
                    width: 245px;
                    margin-left: 30px;
                    border-color: #ddd;
                }
                textarea {
                    border: none;
                    height: 120px;
                    width: 80%;
                    padding: 13px;
                    resize: none;
                }
                img {
                    height: 8px;
                    width: 10px;
                    margin-top: 15px;
                }
                .addressList {
                    position: absolute;
                    top: 40px;
                    right: 0px;
                    height: 210px;
                    width: 270px;
                    border: 1px solid #ddd;
                    overflow-y: auto;
                    background: #fff;
                    ul {
                        border: none;
                        li {
                            height: 30px;
                            line-height: 30px;
                            border: none;
                            padding: 0px 10px;
                        }
                    }
                }
            }
        }
        button {
            width: 160px;
            margin-top: 30px;
            &:last-child {
                margin-left: 14px;
            }
        }
    }
</style>
