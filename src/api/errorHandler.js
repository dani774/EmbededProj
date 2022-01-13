import { store } from '../store/ConfigureStore';
import { get } from 'lodash';
import Message from 'src/UI-Components/message/Message';
import * as authActions from '../component/Authentication/actions';
import * as translation from './translations/fa.json';
import * as constants from './constants';

export function handleError403 (error) {
}

export function handleError502and504 (error) {
    Message('normal', translation['error.502'])
}