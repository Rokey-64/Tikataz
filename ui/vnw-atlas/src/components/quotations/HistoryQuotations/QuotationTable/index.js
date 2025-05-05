import React, { useEffect, useCallback, useReducer } from 'react';
import PaginationComponent from "../../common/Pagination";
import getRFQRecentAPI from "../../../../api/getRFQRecent";
import { useTranslation } from 'react-i18next';
import { debounce} from 'lodash';
import QuotationDiscardDialog from '../QuotationDiscardDisplay'
import QuotationRestoreDisplay from '../QuotationRestoreDisplay'
import deleteRFQAPI from '../../../../api/deleteRFQ';
import { initialState, quotationTableReducer } from '../../../../reducers/quotationTableReducer';

import OrderDataTable from './OrderDataTable';

const QuotationTable = ({ quotationType }) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(quotationTableReducer, initialState);

  // API call with debounce
  const getRFQRecentAPICallback = useCallback(debounce(async (page, type) => {
    const response = await getRFQRecentAPI(page, state.stateRef.all);
    if (response && response.length > 0) {
      const newList = response.map((item, index) => {
        const newItem = {
          id: item.id,
          stt: index + 1,
          order_name: item.order_name,
          type: item.order_type,
          start_date: item.start_date,
          end_date: item.end_date,
          state: item.state,
          display: true
        }

        if (item.state.toUpperCase() !== type.toUpperCase() && type.toUpperCase() !== state.stateRef.all) {
          return { ...newItem, display: false };
        }
        return newItem;
      });
      
      dispatch({ type: 'SET_PAGE_COUNT', payload: response[0].page_count });
      dispatch({ type: 'SET_RECENT_LIST', payload: newList });

    } else {
      dispatch({ type: 'SET_RECENT_LIST', payload: [] });
    }
  }, 500), []);

  // State filter
  useEffect(() => {
    const newList = state.recentList.map((item, index) => {
      if (item.state === quotationType || quotationType === state.stateRef.all) {
        return { ...item, display: true };
      }
      return { ...item, display: false };;
    });

    // If we cannot find one, reload the data
    const found = newList.find(item => item.display === true);
    if (!found) {
      getRFQRecentAPICallback(state.currentPage, quotationType);
      return;
    }

    dispatch({ type: 'SET_RECENT_LIST', payload: newList });
  }, [quotationType]);

  const onPageChange = (page) => {
    getRFQRecentAPICallback(page, quotationType);
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };



  /**
   * Reupdate the recent list after discarding an order
   * @returns {void}
   */
  const discardButtonClicked = async () => {
    // Call the API to discard the order
    const res = await deleteRFQAPI(state.orderStopDataRow.id, 1);
    if (res) {
      const newList = state.recentList.map((item) => {
        if (item.id === state.orderStopDataRow.id) {
          item.state = state.stateRef.rejected;
        }
        return item;
      });

      dispatch({ type: 'SET_RECENT_LIST', payload: newList });
      dispatch({ type: 'SET_ORDER_STOP', payload: null });
    } else {
      alert(t("not_success"));
    }
  }

  const restoreButtonClicked = async () => {
    // Check if the order is overdue
    const currentDate = (new Date()).toISOString().split("T")[0].replace(/-/g, '');
    if (state.orderRestoreDataRow.end_date.replace(/-/g, '') < currentDate) {
      alert(t("no_restore_overdue_quotation"));
      return;
    }

    // Call the API to restore the order
    const response = await deleteRFQAPI(state.orderRestoreDataRow.id, 0);
    if (response) {

      await getRFQRecentAPICallback(state.currentPage, quotationType);

    } else {
      alert(t("not_success"));
    }

    dispatch({ type: 'SET_ORDER_RESTORE', payload: null });
  }



  return (
    <div className="">
      <div className="p-5">
        <OrderDataTable quotationType={quotationType} state={state} dispatch={dispatch} onRefreshClick={getRFQRecentAPICallback}/>
      </div>

      <div className="border-t border-gray-200 px-5 py-3 flex items-center justify-between bg-gray-50">
        <PaginationComponent
          totalPages={state.pageCount}
          onPageChange={onPageChange}
          className="text-sm text-gray-700"
        />
      </div>

      <QuotationDiscardDialog open={state.orderStopDataRow}
        onClose={() => { dispatch({ type: 'SET_ORDER_STOP', payload: null }) }}
        onConfirm={discardButtonClicked}
        orderName={state.orderStopDataRow?.order_name} />


      <QuotationRestoreDisplay open={state.orderRestoreDataRow}
        onClose={() => { dispatch({ type: 'SET_ORDER_RESTORE', payload: null }) }}
        onConfirm={restoreButtonClicked}
        orderName={state.orderRestoreDataRow?.order_name} />
    </div>
  );
};

export default QuotationTable;