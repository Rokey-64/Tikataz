
// This component is used to display the customer logo in the customer card.
const CustomerLogo = () => {
    return (
        <div className="flex items-center justify-center w-[60px] sm:w-40 h-[46px] sm:h-24 rounded-md sm:rounded-2xl bg-white shadow m-2 sm:m-3">
            <img src="./logo-test.png" alt="Avatar" className="w-full h-full object-contain" />
        </div>
    );
};


export default CustomerLogo;