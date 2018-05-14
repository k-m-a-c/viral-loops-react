import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import dotenv from 'dotenv'

dotenv.config()
configure({ adapter: new Adapter() });
global.window = {}
