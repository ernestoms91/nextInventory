import { ErrorMessage, Field, useField } from 'formik';

interface Props {
    label?: string;
    name: string;
    pattern?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'date';
    placeholder?: string;
    classNameLabel?: string;
    classNameInput?: string;
    [x: string]: any;
}


export const MyTextInput = ( { label, classNameLabel ,classNameInput, ...props }: Props ) => {

    const [ field ] = useField(props)

    return (
        <>
            <Field className={`text-input ${classNameInput}  bg-white`} { ...field } { ...props } name={props.name} id={props.name} />
            <ErrorMessage name={ props.name } component="h1"  className='text-red-600 text-center text-xs italic  my-1'/>
        </>
    )
}
