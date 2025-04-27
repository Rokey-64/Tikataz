import { useTranslation } from 'react-i18next';

const TotalAmountDisplay = ({ amount, currency, showTotalAmount, formatCurrencyValue}) => {
  const { t } = useTranslation();

  if (!showTotalAmount) {
    return null; // Don't render anything if showTotalAmount is false
  }



  return (
    <div className="total-amount-display">
      <span className="mr-3">{t('Total Amount')}</span>
      <span className="total-amount-value">
        {formatCurrencyValue(amount, currency)}
      </span>
    </div>
  );
};

export default TotalAmountDisplay;