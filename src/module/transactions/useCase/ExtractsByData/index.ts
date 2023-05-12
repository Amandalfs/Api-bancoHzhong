import {ExtractsRepository} from "../../../../repositories/ExtractsRepository";
import {ExtractsByDataController} from "./ExtractsByDataController";
import {ExtractsByDataUseCase }from "./ExtractsByDataUseCase";

const extractsRepository = new ExtractsRepository;

const extractsByDataUseCase = new ExtractsByDataUseCase(extractsRepository);
const extractsByDataController = new ExtractsByDataController(extractsByDataUseCase);

export default extractsByDataController;