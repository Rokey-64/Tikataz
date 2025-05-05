import DataTable from 'react-data-table-component';
import RefreshButton from "../../../common/RefreshButton";
import Messages from '../../../common/Messages';
import { useTranslation } from 'react-i18next';
import DiscardOrderButton from '../DiscardOrderButton';
import RestoreOrderButton from '../RestoreOrderButton';
import ViewOrderButton from '../ViewOrderButton';

const OrderDataTable = ({ quotationType, state, dispatch, onRefreshClick}) => {
    const { t } = useTranslation();

    /**
     * Refresh button click handler
     * Reloads the recent list
     * @returns {void}
     */
    const refreshButtonClicked = async () => {
        await onRefreshClick(state.currentPage, quotationType);
    }

    const StatusBadge = ({ state, children }) => {
        const styleMap = {
            'PENDING': 'bg-blue-100 text-blue-800',
            'PROCESSING': 'bg-yellow-100 text-yellow-800',
            'FINISHED': 'bg-green-100 text-green-800',
            'REJECTED': 'bg-red-100 text-red-800',
            // 'REJECTED': 'bg-gray-100 text-gray-800',
            'OVERDUE': 'bg-orange-100 text-orange-800'
        };

        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styleMap[state] || 'bg-gray-100 text-gray-800'}`}>
                {children}
            </span>
        );
    };

    // Data formatting functions
    const getDictionaryType = (type) => {
        const typeMap = {
            "auto": t("rfq_kind_auto"),
            "research": t("rfq_kind_market"),
            "finder": t("rfq_kind_find")
        };
        return typeMap[type] || "";
    };

    const getDictionaryState = (state) => {
        const stateMap = {
            "PENDING": t("rfqtype_pending"),
            "PROCESSING": t("rfqtype_processing"),
            "REJECTED": t("rfqtype_rejected"),
            "FINISHED": t("rfqtype_finished"),
            "OVERDUE": t("rfqtype_overdue")
        };
        return stateMap[state.toUpperCase()] || state;
    };

    // Action Buttons Components
    const ActionButtons = ({ row }) => {
        return (
            <div className="flex items-center space-x-2">
                <ViewOrderButton id={row.id} state={state} dispatch={dispatch} />
                <DiscardOrderButton row={row} stateRef={state.stateRef} state={state} dispatch={dispatch} />
                <RestoreOrderButton row={row} stateRef={state.stateRef} state={state} dispatch={dispatch} />
            </div>
        );
    };


    const columns = [
        {
            name: t("item_no"),
            selector: row => row.stt,
            sortable: true,
            width: '80px',
            cell: row => <div className="text-gray-700">{row.stt}</div>
        },
        {
            name: t("rfqtype"),
            selector: row => row.type,
            width: '150px',
            cell: row => <div className="text-gray-700 font-medium">{getDictionaryType(row.type)}</div>
        },
        {
            name: t("rfqname"),
            selector: row => row.order_name,
            sortable: true,
            width: '250px',
            cell: row => <div className="text-gray-900 font-medium truncate">{row.order_name}</div>
        },
        {
            name: t("inline_cards_start"),
            selector: row => row.start_date,
            width: '120px',
            cell: row => <div className="text-gray-600 text-sm">{row.start_date}</div>
        },
        {
            name: t("inline_cards_end"),
            selector: row => row.end_date,
            width: '120px',
            cell: row => <div className="text-gray-600 text-sm">{row.end_date}</div>
        },
        {
            name: t("inline_cards_status"),
            selector: row => row.state,
            width: '150px',
            cell: row => <StatusBadge state={row.state}>{getDictionaryState(row.state)}</StatusBadge>
        },
        {
            name: "",
            selector: row => <ActionButtons row={row} />,
            width: '120px',
            ignoreRowClick: true
        }
    ];

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#f8fafc',
                borderBottomWidth: '1px',
                borderColor: '#e2e8f0',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#64748b'
            },
        },
        rows: {
            style: {
                minHeight: '60px',
                '&:not(:last-of-type)': {
                    borderBottomWidth: '1px',
                    borderColor: '#f1f5f9',
                },
                '&:hover': {
                    backgroundColor: '#f8fafc',
                },
            },
        },
    };
    return (
        <DataTable
            title={
                <div className="text-xl font-semibold text-gray-800">
                    <hr className="text-gray-400 text-sm mt-1 my-3" />
                    <Messages type="AutRFQHistoryMessage" />
                    <RefreshButton onClick={refreshButtonClicked} />
                </div>}
            columns={columns}
            data={state.recentList.filter(item => item.display)}
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            fixedHeader
            // fixedHeaderScrollHeight="calc(100vh - 250px)"
            onRowMouseEnter={(row) => dispatch({ type: 'SET_HOVERED_ROW', payload: row.id })}
            onRowMouseLeave={() => dispatch({ type: 'SET_HOVERED_ROW', payload: null })}
            noDataComponent={<div className="py-8 text-gray-500">{t("no_data_available")}</div>}
        />
    );
}

export default OrderDataTable;