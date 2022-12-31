const MyCommissionCard = ({ commission }) => {
    const { name, image, category, price, isPaid, isCompleted, buyerName } = commission;
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl w-full my-5">
            <figure><img className="w-72 h-48 ml-5" src={image} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="grow-0">Price range: {price} $</p>
                <p className="grow-0">Category: <span className="capitalize">{category}</span></p>
                <p className="grow-0">Requested by: {buyerName}</p>
                <p>Status: {!isCompleted && !isPaid ? 'Pending' : ''} {isCompleted && !isPaid ? 'Completed' : ''} {isPaid && isCompleted ? 'Paid' : ''}</p>
                <div className="card-actions justify-end">
                    {!isCompleted && !isPaid ? <button className="btn btn-primary">Finish</button> : <></>}
                    {isCompleted && !isPaid ? <button className="btn btn-primary btn-disabled">Payment in progress</button> : <></>}
                    {isPaid && isCompleted ? <button className="btn btn-primary btn-disabled">Paid</button> : <></>}
                </div>
            </div>
        </div>
    );
};

export default MyCommissionCard;