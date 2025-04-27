import { createSlice } from "@reduxjs/toolkit";

export const mockupAtlas = {
    atlasKind: 'card',
    cid: '67d001b1f5b051487fcc2859',
    uid: 'dkebsheu1sed55a8wwd5+',
    ctype: 'manual',
    data: {
        general: {
            logo: 'https://055.vn/wp-content/uploads/2020/03/cropped-icon-180x180.jpg',
            branchName: 'Công ty 555 Quân Đội Việt Nam',
            description: 'Chuyên cung cấp camera hành trình, camera an ninh, camera wifi, camera giám sát',
            address: "Số 1, Đường 2, Khu Công Nghiệp Amata, Biên Hòa, Đồng Nai",
            website: 'https://quantrimang.com/',
            workingTime: [
                { start: '0800', end: '1700', active: true, index: 0 },
                { start: '0800', end: '1700', active: true, index: 1 },
                { start: '0800', end: '1700', active: true, index: 2 },
                { start: '0800', end: '1700', active: true, index: 3 },
                { start: '0800', end: '2300', active: true, index: 4 },
                { start: '0800', end: '2300', active: true, index: 5 },
                { start: '0800', end: '1700', active: false, index: 6 }
            ],
            businessField: 'Kinh doanh lĩnh vực cơ khí, cơ điện tử'
        },
        products: [
            {
                id: '1',
                name: 'Camera hành trình',
                link: 'https://bizweb.dktcdn.net/thumb/large/100/357/448/products/camera-ipc-s2xp-6m0web-1-600x600-1-c892f809-7b66-4e8b-86ba-0807058d1f4e.jpg?v=1713426225043',
                key: ''
            },
            {
                id: '2',
                name: 'Camera an ninh',
                link: 'https://cdn.tgdd.vn/Products/Images/4728/327948/TimerThumb/camera-ip-360-do-2mp-tp-link-tapo-c200c-(1).jpg',
                key: ''
            },
            {
                id: '2',
                name: 'Camera an ninh',
                link: 'https://cdn.tgdd.vn/Products/Images/4728/335126/TimerThumb/camera-ip-ngoai-troi-360-do-5mp-tp-link-tapo-c530ws-(3).jpg',
                key: ''
            }
        ],
        customers: [
            {
                id: '1',
                custName: 'Khách hàng 1',
                custAddress: 'Số 1, Đường 2, Khu Công Nghiệp Amata, Biên Hòa, Đồng Nai',
                link: 'https://www.mina.com.vn/userfiles/nhon-hoa_798.png',
            },
            {
                id: '2',
                custName: 'Khách hàng 1',
                custAddress: 'Số 1, Đường 2, Khu Công Nghiệp Amata, Biên Hòa, Đồng Nai',
                link: 'https://www.mina.com.vn/userfiles/bp-castrol_320.png',
            },
            {
                id: '3',
                custName: 'Khách hàng 1',
                custAddress: 'Số 1, Đường 2, Khu Công Nghiệp Amata, Biên Hòa, Đồng Nai',
                link: 'https://www.mina.com.vn/userfiles/hugamex_408.png',
            },
            {
                id: '4',
                custName: 'Khách hàng 1',
                custAddress: 'Số 1, Đường 2, Khu Công Nghiệp Amata, Biên Hòa, Đồng Nai',
                link: 'https://www.mina.com.vn/userfiles/saigon-tech_836.png',
            },
            {
                id: '5',
                custName: 'Khách hàng 1',
                custAddress: 'Số 1, Đường 2, Khu Công Nghiệp Amata, Biên Hòa, Đồng Nai',
                link: 'https://www.mina.com.vn/userfiles/fpt-u_807.png',
            },
            {
                id: '6',
                custName: 'Khách hàng 1',
                custAddress: 'Số 1, Đường 2, Khu Công Nghiệp Amata, Biên Hòa, Đồng Nai',
                link: 'https://www.mina.com.vn/userfiles/thcs-mkh_859.png',
            },
            {
                id: '7',
                custName: 'Khách hàng 1',
                custAddress: 'Số 1, Đường 2, Khu Công Nghiệp Amata, Biên Hòa, Đồng Nai',
                link: 'https://www.mina.com.vn/userfiles/hoa-sen-edu_522.png',
            },
            {
                id: '8',
                custName: 'Khách hàng 1',
                custAddress: 'Số 1, Đường 2, Khu Công Nghiệp Amata, Biên Hòa, Đồng Nai',
                link: 'https://www.mina.com.vn/userfiles/tran-boi-co_132.png',
            },
            {
                id: '9',
                custName: 'Khách hàng 1',
                custAddress: 'Số 1, Đường 2, Khu Công Nghiệp Amata, Biên Hòa, Đồng Nai',
                link: 'https://www.mina.com.vn/userfiles/danieli_533.png',
            }
        ],
        certificates: [
            {
                id: '1',
                certype: 'Chứng nhận Kosher',
                certCode: 'CNKN010252',
                certValidDate: '2025-02-23T00:00:00.000Z',
                certExpiredDate: '2025-03-27T00:00:00.000Z',
                certWeblink: '',
                certProvider: 'CT21'
            },
            {
                id: '2',
                certype: 'Chứng nhận Halal',
                certCode: 'CNKN010252',
                certValidDate: '2025-02-23T00:00:00.000Z',
                certExpiredDate: '2025-03-27T00:00:00.000Z',
                certWeblink: '',
                certProvider: 'CT21'
            },
            {
                id: '3',
                certype: 'Chứng nhận hàng Việt Nam chất lượng cao',
                certCode: 'CNKN010252',
                certValidDate: '2025-02-23T00:00:00.000Z',
                certExpiredDate: '2025-03-27T00:00:00.000Z',
                certWeblink: '',
                certProvider: 'CT21'
            },
            {
                id: '4',
                certype: 'Chứng nhận ISO (Tổ chức Tiêu chuẩn hóa Quốc tế)',
                certCode: 'CNKN010252',
                certValidDate: '2025-02-23T00:00:00.000Z',
                certExpiredDate: '2025-03-27T00:00:00.000Z',
                certWeblink: '',
                certProvider: 'CT21'
            },
            {
                id: '5',
                certype: 'Chứng nhận RSPO (Roundtable on Sustainable Palm Oil)',
                certCode: 'CNKN010252',
                certValidDate: '2025-02-23T00:00:00.000Z',
                certExpiredDate: '2025-03-27T00:00:00.000Z',
                certWeblink: '',
                certProvider: 'CT21'
            }
        ],
    },
    badges: [
        {
            id: '1',
            code: 'T10',
            name: 'Tóp 10',
            validDate: '2025-02-23',
            expiredDate: '2025-08-27'
        },
        {
            id: '2',
            code: 'CONFIRMED',
            name: 'Đã xác thực',
            validDate: '2025-02-23',
            expiredDate: '2025-08-27'
        },
        {
            id: '3',
            code: 'TRUST',
            name: 'Doanh nghiệp uy tính',
            validDate: '2025-02-23',
            expiredDate: '2025-08-27'
        },
        {
            id: '4',
            code: 'GREENCORP',
            name: 'Doanh nghiệp xanh',
            validDate: '2025-02-23',
            expiredDate: '2025-08-27'
        },
        {
            id: '5',
            code: 'HOCORP',
            name: 'Doanh nghiệp công ích',
            validDate: '2025-02-23',
            expiredDate: '2025-08-27'
        }
    ],
    rating: 5,
    reaction: {
        like: 0,
        love: 0,
    }
}

const slice = createSlice({
    name: "atlas",
    initialState: [
        mockupAtlas
    ],
    reducers: {
        /** Load atlas from the server for the first time */
        setAtlas: (state, action) => {
            return action.payload;
        },

        /** Insert an atlas into the atlas array */
        insertAtlas: (state, action) => {
            state.push(action.payload);
        },

        /** Update an atlas in the atlas array */
        updateAtlas: (state, action) => {
            const index = state.findIndex(atlas => atlas.cid === action.payload.cid);
            if (index >= 0) {
                state[index] = action.payload;
            }
        },

        /** Delete an atlas from the atlas array */
        deleteAtlas: (state, action) => {
            return state.filter(atlas => action.payload.includes(atlas.id) === false);
        },

        /** Clear all atlas data */
        clearAtlas: (state) => {
            return [];
        }
    }
});

export const { setAtlas, insertAtlas, updateAtlas, deleteAtlas, clearAtlas} = slice.actions;
export default slice.reducer;