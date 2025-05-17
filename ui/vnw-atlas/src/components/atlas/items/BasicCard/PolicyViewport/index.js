import { useEffect, useState } from "react";
import getAtlasCardPolicyAPI from "@/api/getAtlasCardPolicy";

const PolicyViewport = ({ card, visible }) => {
    const [policy, setPolicy] = useState(null);

    useEffect(() => {
        if (policy) return;
        if (!visible) return;

        // Fetch the card policy data when the component mounts or when the card prop changes
        const fetchCardPolicy = async () => {
            const { cid, ctype } = card;
            const payload = await getAtlasCardPolicyAPI(cid, ctype);
            if (!payload) return;
            setPolicy(payload);

        };

        fetchCardPolicy();
    }
        , [visible]);

    return (
        <div className={`${visible ? "block" : "hidden"}`}>
            <PolicySection card={card} policyData={policy} />
        </div>
    );
}

export default PolicyViewport;

// components/PolicySection.tsx
function PolicySection({ card, policyData }) {
    // Render từng mục chính sách với icon và title
    const renderPolicyBlock = (icon, title, items) => {
        if (!items || items.length === 0) return null;

        return (
            <div className="mb-4 last:mb-0">
                <div className="flex items-center mb-2">
                    <span className="text-blue-500 text-xl mr-2">{icon}</span>
                    <h4 className="font-medium text-gray-800">{title}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-start">
                            <div className="w-2 h-2 mt-2 mr-2 rounded-full bg-green-500 flex-shrink-0"></div>
                            <span className="text-sm text-gray-800">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Xử lý dữ liệu policy
    const processPolicyData = () => {
        if (!policyData) return null;
        const { kindOfBusiness, transportation, partner, storage } = policyData;
        const sections = [];

        // 1. Loại hình kinh doanh
        const businessTypes = [];
        if (kindOfBusiness.production.value) businessTypes.push("Sản xuất");
        if (kindOfBusiness.outsourcing.value) businessTypes.push("Gia công");
        if (kindOfBusiness.service.value) businessTypes.push("Dịch vụ");
        if (kindOfBusiness.commerce.value) businessTypes.push("Thương mại");

        if (businessTypes.length > 0) {
            sections.push(renderPolicyBlock("💼", "Loại hình kinh doanh", businessTypes));
        }

        // 2. Chính sách vận chuyển
        const transportItems = [];

        if (transportation.domestic.value) {
            transportItems.push("Vận chuyển nội địa");
        }

        if (transportation.international.value) {
            transportItems.push("Vận chuyển quốc tế");

            // Các phương thức vận chuyển quốc tế
            const { kind } = transportation.international;
            if (kind.air.value) transportItems.push("Đường hàng không");
            if (kind.sea.value) transportItems.push("Đường biển");
            if (kind.rail.value) transportItems.push("Đường sắt");
            if (kind.road.value) transportItems.push("Đường bộ");

            // Các điều kiện giao hàng (Incoterms)
            Object.entries(transportation.international.incoterm).forEach(([term, { value }]) => {
                if (value) transportItems.push(`Điều kiện giao hàng: ${term}`);
            });
        }

        if (transportItems.length > 0) {
            sections.push(renderPolicyBlock("🚚", "Chính sách vận chuyển", transportItems));
        }

        // 3. Chính sách đối tác
        const partnerItems = [];

        if (partner.sightseeing.value) partnerItems.push("Tham quan nhà máy");
        if (partner.template.value) partnerItems.push("Tạo mẫu");
        if (partner.certification.value) partnerItems.push("Cung cấp chứng chỉ");
        if (partner.schedule.value) partnerItems.push("Đặt hàng trước");
        if (partner.debt.value) partnerItems.push("Hỗ trợ công nợ");

        if (partnerItems.length > 0) {
            sections.push(renderPolicyBlock("🤝", "Chính sách đối tác", partnerItems));
        }

        // 4. Dịch vụ kho bãi
        const storageItems = [];

        if (storage.value) {
            if (storage.kind.options.cold.value) storageItems.push("Kho lạnh");
            if (storage.kind.options.dry.value) storageItems.push("Kho khô");
            if (storage.kind.options.material.value) storageItems.push("Kho nguyên liệu");
            if (storage.kind.options.product.value) storageItems.push("Kho thành phẩm");

            if (storage.area.value > 0) storageItems.push(`Diện tích: ${storage.area.value}m²`);
            if (storage.capacity.value > 0) storageItems.push(`Sức chứa: ${storage.capacity.value}tấn`);

            sections.push(renderPolicyBlock("📦", "Dịch vụ kho bãi", storageItems));
        }

        
        return sections;
    };

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-blue-500 mr-2">📋</span>
                Chính sách doanh nghiệp
            </h3>

            <div className="space-y-5">
                {processPolicyData()}
            </div>
        </div>
    );
}

// Helper component
const InfoItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-sm font-medium text-gray-800">{value || "-"}</span>
    </div>
);