import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "@/redux/cardsSlice";
import QuestionCover from "./QuestionCover";
import QuestionTypeOption1 from "./QuestionTypeOption1";
import QuestionTypeOption2 from "./QuestionTypeOption2";
import QuestionTypeInput from "./QuestionTypeInput";
import Messages from "@/components/studio/common/Messages";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import get from "lodash/get";
import { useTranslations } from "next-intl";


const CardQuestions = () => {
    const t = useTranslations("trans.studio.card");
    const dispatch = useDispatch();
    const category = useSelector((state) => state.cards.category);
    const note = t("product.m1")

    const updateCategory = (root, path, value) => {
        const obj = cloneDeep(root);
        set(obj, path, value);
        dispatch(setCategory(obj));
    };

    const kindOfBusiness = () => {
        return (
            <div className="grid md:grid-cols-[350px_350px] xl:grid-cols-[450px_450px] gap-4">
                <QuestionTypeOption1 title={t("product.kindprod")} path="kindOfBusiness.production" callback={updateCategory} root={category}
                    explain={t("product.m2")}/>

                <QuestionTypeOption1 title={t("product.kindoursourcing")} path="kindOfBusiness.outsourcing" callback={updateCategory} root={category}
                    explain={t("product.m3")}/>

                <QuestionTypeOption1 title={t("product.kindserv")} path="kindOfBusiness.service" callback={updateCategory} root={category}
                    explain={t("product.m4")}/>

                <QuestionTypeOption1 title={t("product.kindtrade")} path="kindOfBusiness.commerce" callback={updateCategory} root={category}
                    explain={t("product.m5")}/>
            </div>
        );
    };

    const transportation = () => {
        return (
            <div className="space-y-6">
                <QuestionTypeOption1 title={t("transp.domes")} path="transportation.domestic" callback={updateCategory} root={category}
                    explain={t("transp.m1")}>
                    <QuestionTypeOption1 title={t("transp.bypartner")} path="support" callback={updateCategory} root={category} />
                    <QuestionTypeOption1 title={t("transp.bysrv")} path="byService" callback={updateCategory} root={category} />
                    <QuestionTypeOption1 title={t("transp.byself")} path="byBuyer" callback={updateCategory} root={category} />
                </QuestionTypeOption1>

                <QuestionTypeOption1 title={t("transp.intern")} path="transportation.international" callback={updateCategory} root={category}
                    explain={t("transp.m2")}>
                    <QuestionTypeOption2 title={t("transp.kind")} path="international" root={category} callback={updateCategory}
                        options={[
                            { air: t("transp.air")},
                            { sea: t("transp.sea")},
                            { rail: t("transp.rail")},
                            { road: t("transp.land")}]} />
                    <QuestionTypeOption2 title={t("transp.way")} path="incoterm" root={category} callback={updateCategory}
                        options={[
                            { EXW: "EXW" },
                            { FCA: "FCA" },
                            { FAS: "FAS" },
                            { FOB: "FOB" },
                            { CFR: "CFR" },
                            { CIF: "CIF" },
                            { CPT: "CPT" },
                            { DDP: "DDP" },
                            { DAP: "DAP" },
                            { DPU: "DPU" },
                            { negotiation: t("transp.nego") }]}
                    />
                </QuestionTypeOption1>

                <QuestionTypeOption1 title={t("transp.time")} path="transportation.time" callback={updateCategory} root={category}
                    explain={t("transp.timemexpl")}>
                    <QuestionTypeInput title={t("transp.timedomesavg")} unit={t("transp.timeunit")}
                        path="domestic" callback={updateCategory} root={category} />

                    <QuestionTypeInput title={t("transp.timeintersavg")} unit={t("transp.timeunit")}
                        path="international" callback={updateCategory} root={category} />
                </QuestionTypeOption1>
            </div>
        );
    };

    const partner = () => {
        return (
            <div className="space-y-6">
                <QuestionTypeOption1 title={t("partner.sightseeing.title")} path="partner.sightseeing" callback={updateCategory} root={category}
                    explain={t("partner.sightseeing.explain")}>
                    <QuestionTypeOption1 title={t("partner.sightseeing.thirdParty.title")} path="thirdParty" callback={updateCategory} root={category}
                        explain={t("partner.sightseeing.thirdParty.explain")}/>
                </QuestionTypeOption1>
                <QuestionTypeOption1 title={t("partner.template.title")} path="partner.template" callback={updateCategory} root={category}
                    explain={t("partner.template.explain")}>
                    <QuestionTypeOption2 title={t("partner.template.cost.title")} callback={updateCategory} path="cost" root={category}
                        options={[
                            { byCustomer: t("partner.template.cost.options.byCustomer")},
                            { byProvider: t("partner.template.cost.options.bySupplier")},
                            { negotiation: t("partner.template.cost.options.negotiation")}]} />
                    <QuestionTypeInput title={t("partner.template.cost.time.title")} unit={t("partner.template.cost.time.unit")} path="time" callback={updateCategory} root={category} />
                </QuestionTypeOption1>
                <QuestionTypeOption1 title={t("partner.cert.title")} path="partner.certification" callback={updateCategory} root={category}
                    explain={t("partner.cert.title")}/>
                <QuestionTypeOption1 title={t("partner.sche.title")} path="partner.schedule" callback={updateCategory} root={category}
                    explain={t("partner.sche.explain")}/>
                <QuestionTypeOption1 title={t("partner.debt.title")} path="partner.debt" callback={updateCategory} root={category}
                    explain={t("partner.debt.explain")}>
                    <QuestionTypeOption1 title={t("partner.debt.options.domestic.title")} path="domestic" callback={updateCategory} root={category}
                        explain={t("partner.debt.options.domestic.explain")}/>
                    <QuestionTypeOption1 title={t("partner.debt.options.inter.title")} path="international" callback={updateCategory} root={category}
                        explain={t("partner.debt.options.inter.explain")} />
                </QuestionTypeOption1>
                <QuestionTypeOption1 title={t("partner.failover.title")} path="partner.failover" callback={updateCategory} root={category}
                    explain={t("partner.failover.explain")}/>
            </div>
        );
    };

    const storage = () => {
        return (
            <div className="space-y-6">
                <QuestionTypeOption1 title={t("storage.title")} path="storage" callback={updateCategory} root={category}
                    explain={t("storage.explain")}>
                    <QuestionTypeOption2 title={t("storage.kind.title")} path="type" root={category} callback={updateCategory}
                        options={[
                            { cold: t("storage.kind.options.cold")},
                            { dry: t("storage.kind.options.dry")},
                            { material: t("storage.kind.options.material")},
                            { product: t("storage.kind.options.product")}]} />
                    <QuestionTypeInput title={t("storage.area.title")} unit={t("storage.area.unit")} path="area" callback={updateCategory} root={category} />
                    <QuestionTypeInput title={t("storage.cap.title")} unit={t("storage.cap.unit")} path="capacity" callback={updateCategory} root={category} />
                    <QuestionTypeOption1 title={t("storage.cost.title")} explain={t("storage.cost.explain")} path="cost" callback={updateCategory} root={category}>
                        <QuestionTypeOption1 title={t("storage.cost.options.byCustomer")} path="byCustomer" callback={updateCategory} root={category} />
                        <QuestionTypeOption1 title={t("storage.cost.options.bySupplier")} path="byProvider" callback={updateCategory} root={category} />
                        <QuestionTypeOption1 title={t("storage.cost.options.negotiation")} path="negotiation" callback={updateCategory} root={category} />
                    </QuestionTypeOption1>
                    <QuestionTypeInput title={t("storage.time.title")} unit={t("storage.time.unit")} path="time" callback={updateCategory} root={category} />
                </QuestionTypeOption1>
            </div>
        );
    };

    const merge = () => {
        return (
            <div>
                <QuestionTypeOption1 title={t("merge.title")} path="merge" callback={updateCategory} root={category}
                    explain={t("merge.explain")}/>
            </div>
        );
    };

    const promotion = () => {
        return (
            <div>
                <QuestionTypeOption1 title={t("prom.title")} path="promotion" callback={updateCategory} root={category}
                    explain={
                        t.rich("prom.explain", {
                            strong: (chunks) => <strong>{chunks}</strong>,  
                            br: () => <br />,
                            mark: (chunks) => <mark>{chunks}</mark>,
                        })
                    }>
                    <QuestionTypeOption1 title={t("prom.number.title")} path="number" callback={updateCategory} root={category}
                        explain={t("prom.number.explain")} />
                    <QuestionTypeOption1 title={t("prom.loyal.title")} path="loyal" callback={updateCategory} root={category}
                        explain={t("prom.loyal.explain")} />
                    <QuestionTypeOption1 title={t("prom.time.title")} path="time" callback={updateCategory} root={category}
                        explain={t("prom.time.explain")} />
                    <QuestionTypeOption1 title={t("prom.loc.title")} path="location" callback={updateCategory} root={category}
                        explain={t("prom.loc.explain")}>
                        <QuestionTypeOption1 title={t("prom.loc.dom")} path="domestic" callback={updateCategory} root={category} />
                        <QuestionTypeOption1 title={t("prom.loc.inter")} path="international" callback={updateCategory} root={category} />
                    </QuestionTypeOption1>
                </QuestionTypeOption1>
            </div>
        );
    }

    const checkRequired = () => {
        if (get(category, "kindOfBusiness.production.value")
            || get(category, "kindOfBusiness.outsourcing.value")
            || get(category, "kindOfBusiness.service.value")
            || get(category, "kindOfBusiness.commerce.value")) {
            return false;
        }
        return true;
    }
    return (
        <div className="mb-10">
            <Messages type="CategoryMessage" />
            <QuestionCover title={t("comm.k1")} template={kindOfBusiness()} note={note} isOpen={true} isRequired={checkRequired()} />
            <QuestionCover title={t("comm.k2")} template={transportation()} />
            <QuestionCover title={t("comm.k3")} template={partner()}/>
            <QuestionCover title={t("comm.k4")} template={storage()}/>
            <QuestionCover title={t("comm.k5")} template={merge()}/>
            <QuestionCover title={t("comm.k6")} template={promotion()}/>
        </div>
    );
};

export default CardQuestions;
