## API `Form` component

Form

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| fields | a Object that each key of it contain another object for define field properties | Object | - |  |
| middleText | a ReactNode that Placed between fields and submit button  | ReactNode | - |  |
| submitButton | this property get a object to show submit button  | object | - |  |
| doubleButtons | if it be `true` add a `cancelButton` to form | boolean | - |  |
| cancelButton | this property get a object to show Cancel button  | object | - |  |

fields

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| name | name of property (key) in data object of form | String | - |  |
| label | text of label that show in UI  | String | - |  |
| type | type of input | String| `input`, `partitionInput`, `datePicker`, `select` , `select2`  |  |
| editable | input be editable or no. this support only for `input` type.  | boolean | `true` |  |
| keyboardType | input be editable or no. this support only for `input` type.  | String | https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options/ |  |
| defaultValue | defaultValue for input. it support only in `select` type  | String | - |  |
| maximumDate | maximumDate of calendar. this support only for `datePicker` type.  | String | - |  |
| minimumDate | minimumDate of calendar . this support only for `datePicker` type.  | String | - |  |
| data | a object of key and value that show items in `select` type.   | object | - |  |
| nonRequirement | if this field be true dont need fill the filed to submit form.  | boolean | - |  |
| cellCount | number of cell in `partitionInput` type | number | - |  |
| doubleFields | for show two input in a line. it get a object that has two field object.  | object | - |  |
| helpMessage | a text show under input to help user for fill. this support only for `input` type.  | String | - |  |
| errorMessage | a text show under input to show error after submit and validation. this support only for `input` type.  | String | - |  |
| textAlign | textAlign of text. this support only for `input` type.  | String | Language base |  |
| size | size of input in default is medium. if pass `large` to increase it . this support only for `input` type.  | String |  |  |
| secureTextEntry | for dont show secureText . this support only for `input` and  `partitionInput` type.  | boolean | `false` |  |
| backColor | background color of input. this support only for `input` type.  | String | 'white' |  |

submitButton

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| text | main text of button | String | - |  |
| style | custom style for button container  | object | - |  |
| loading | show a ActivityIndicator when with press the button send a request ro server. | object | - |  |
| icon | insert custom icon in right of text | ReactNode | - |  |
| submitHandler | custom function that run when submit the form  | func | - |  |

cancelButton

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| text | main text of button | String | - |  |
| style | custom style for button container  | object | - |  |
| loading | show a ActivityIndicator when with press the button send a request ro server. | object | - |  |
| icon | insert custom icon in right of text | ReactNode | - |  |
| cancelHandler | custom function that run when cancel the form form submit  | func | - |  |

loading

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| url | url of request that Button listen to it  | String | - |  |
| requestType | requestType of url for example `Get`, `Post`, ... | String | - |  |
