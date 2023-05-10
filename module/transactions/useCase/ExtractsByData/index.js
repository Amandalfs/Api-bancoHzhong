const ExtractsRepository = require("../../../../repositories/ExtractsRepository");
const ExtractsByDataController = require("./ExtractsByDataController");
const ExtractsByDataUseCase = require("./ExtractsByDataUseCase");

const extractsRepository = new ExtractsRepository;

const extractsByDataUseCase = new ExtractsByDataUseCase(extractsRepository);
const extractsByDataController = new ExtractsByDataController(extractsByDataUseCase);

module.exports = extractsByDataController;