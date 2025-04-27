import buildCardModel, {buildFastCardModel} from "../../../services/buildCardModel.js";
import getModelService from "../../../services/getModelService.js";
import cardModel from "../../../models/mongoo/cardModel.js";
import { showMessage } from "../../../databases/http_fluentd.js";


const mongoUpdateCard = async (req, res, next) => {
    const model = getModelService(req);
    const cardData = model.payload;
    
    // If the ID exists, then we are updating an existing card
    if(cardData.id){
        const flatCardData = buildFastCardModel(cardData.changedTarget, cardData);

        try{
            await cardModel.findByIdAndUpdate(
                cardData.id,
                { $set: flatCardData }
            )
        }
        catch(err){
            // ⛔ TODO: Log the error here
            showMessage(err);
            return res.status(500).json(setFeedback(req.feedback, false));
        }

        model.id = cardData.id;
    }
    else{
        // If the ID does not exist, then we are creating a new card
        const card = new cardModel({
            user_id: req.userID,
            general: {
                logo: cardData?.general?.logo,
                branchName: cardData?.general?.branchName,
                description: cardData?.general?.description,
                email: cardData?.general?.email,
                phone: cardData?.general?.phone,
                fax: cardData?.general?.fax,
                zalo: cardData?.general?.zalo,
                address: cardData?.general?.address,
                website: cardData?.general?.website,
                workingTime: cardData?.general?.workingTime,
                social: cardData?.general?.social,
            },
            products: cardData?.products,
            customers: cardData?.customers,
            certificates: cardData?.certificates,
            category: cardData?.category,
        });
        
        try{
            await card.save();

            model.id = card._id.toString();
        }
        catch(err){
            // ⛔ TODO: Log the error here
            showMessage(err);
            return res.status(500).json(setFeedback(req.feedback, false));
        }

    }
    
    
    next();
};

export default mongoUpdateCard;