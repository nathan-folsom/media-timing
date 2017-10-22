import { IErrorFactory } from '../interfaces';

// @todo Remove this declaration again if TypeScript supports the DOMException constructor.
declare const DOMException: {
    new (message: string, name: string): DOMException;
};

export class IllegalValueErrorFactory implements IErrorFactory {

    public create () {
        try {
            return new DOMException('', 'IllegalValueError');
        } catch (err) {
            const exception: any = new Error();

            // @todo exception.code;
            exception.name = 'IllegalValueError';

            return exception;
        }
    }

}
