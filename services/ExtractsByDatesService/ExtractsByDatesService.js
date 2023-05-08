const AppError = require("../../utils/AppError");

module.exports = class ExtractsByDatesService{
    extractsRepository;
    constructor(ExtractsRepository){
        this.extractsRepository = ExtractsRepository;
    } 

    async execute(id_user, dateStart, dateEnd){

        try {

            const extracts = await this.extractsRepository.SearchForDataStartAndEndbyId(id_user, dateStart, dateEnd);

            return extracts;

        } catch (error) {
            throw new AppError(error.message);
        }

     ;

    }
}