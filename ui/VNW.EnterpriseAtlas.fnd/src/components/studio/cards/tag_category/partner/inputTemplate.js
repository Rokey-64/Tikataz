import ImageLoadingBoard from "../../../common/image_loading_board";
import ElementSingleText from "../../../common/text_input_component/elementSingleText";
import InsertNoticeText from "../../insert_notice";


/**
 * Default input template for the partner card
 * @param {*} param0 
 * @returns 
 */
const InputTemplate = ({ object, callback }) => {
    const inputCallback = (key, value) => {
        callback({...object, [key]: value});
    };

    return (
        <div>
            <form className="grid grid-cols-2 gap-3 max-w-[400px]">
                <div className="col-span-2">
                    <InsertNoticeText
                        header="Điền thông tin khách hàng của bạn vào các trường dưới đây"
                        content={
                            <>
                                * Thông tin được hiện thị trên thẻ của bạn, giúp tăng độ uy tín và tin cậy đối với đối tác tiềm năng.<br /><br />
                                * Trong trường hợp cần ghi nhận xác thực, chúng tối sẽ tiến hành kiểm tra cụ thể hơn.
                            </>
                        }
                    />
                </div>
                <div className="flex items-center mb-6 col-span-2 space-x-4">
                    <ImageLoadingBoard
                        label="Select logo"
                        aditionalClasses='h-20 w-24'
                        callback={inputCallback.bind(this, "custLogo")}
                        defaultValue=''
                    />
                </div>

                <div className="col-span-2">
                    <ElementSingleText callback={inputCallback.bind(this, "custName")} defaultValue=''
                        options={{ text: "Tên khách hàng", holder: "Nhập tên công ty hoặc tên thương hiệu", isRequired: true, limmit: 200}} />
                </div>
                <div>
                    <ElementSingleText callback={inputCallback.bind(this, "taxcode")} defaultValue=''
                        options={{ text: "Mã số thuế", holder: "Nhập mã số thuế khách hàng của bạn", }} />
                </div>

                <div className="mt-3 col-span-2">
                    <ElementSingleText callback={inputCallback.bind(this, "custAddress")} defaultValue=''
                        options={{ text: "địa chỉ", holder: "Nhập địa chỉ trụ sở của khách hàng của bạn"}} />
                </div>

                
            </form>
        </div>
    );
};

export default InputTemplate;