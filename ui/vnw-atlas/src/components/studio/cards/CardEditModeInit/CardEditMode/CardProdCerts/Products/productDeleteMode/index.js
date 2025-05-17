
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "@/redux/cardsSlice";
import RightDeleteContainer from "@/components/studio/common/RightDeleteContainer";
import CardMessages from "@/components/studio/common/Messages";
import { useTranslations } from "next-intl";

/**
 * Display the remove box when the delete mode is on
 * @param {*} param0 
 * @returns 
 */
const ProductDeleteMode = ({ delStatus, setDelStatus }) => {
    const t = useTranslations("trans");
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cards.products);

    const deleteCallback = () => {
        const newProducts = products.filter((prod) => prod.id !== delStatus.currentObjects[0]?.id);
        URL.revokeObjectURL(delStatus.currentObjects[0]?.image);
        dispatch(setProducts(newProducts));

        setDelStatus({ ...delStatus, status: false, currentObjects: [] });
    };

    const state = {
        currentObjects: [{
            name:
                <div className="flex items-center">
                    <img
                        src={delStatus.currentObjects[0]?.image}
                        alt="product"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>
        }],
    };

    const setStateHandler = (state) => {
        setDelStatus(state);
    };

    if (!delStatus.status) return null;
    return (
        <RightDeleteContainer state={state} setState={setStateHandler} callback={deleteCallback}
            headerContent={<h1 className="text-[18px]"><strong>{t("studio.card.product.del")}</strong></h1>}>
            <div>
                <CardMessages type="DelBranchInfoMessage" />
            </div>
        </RightDeleteContainer>
    )
};

export default ProductDeleteMode;