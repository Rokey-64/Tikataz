/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
class DataList{

    MenuList01 = [
        {id:1,content:'Giới thiệu chung 3333'},
        {id:2,content:'Hiểu về mô hình workshop'},
        {id:3,content:'Hợp đồng điện tử'},
        {id:3,content:'Chính sách nhà phát triển'}
    ];

    Catalogies = [
        {id:1,col:1,href:'partner',content:'Đối tác'},
        {id:2,col:1,href:'customer',content:'Khách hàng'},
        {id:3,col:1,href:'term',content:'Điều khoản'},
        {id:4,col:2,href:'advirtisement',content:'Quảng cáo'},
        {id:5,col:2,href:'accounting',content:'Kế toán'},
        {id:6,col:2,href:'feedback',content:'Phản hồi & góp ý'},
        {id:7,col:3,href:'cooperate',content:'Hợp tác'}
    ];

    GetDate(keyword){
        if(keyword === 'MenuList01'){
            return this.MenuList01;
        }
        else{
            return this.Catalogies;
        }
    }
}

const ListOfAPI = new DataList();

export default ListOfAPI;