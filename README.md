# react-native-wxui
A UI package for React Native , both available on iOS and Android
#Intallation
> npm i react-native-wxui --save

#Usage
* [Form](#Form)
* [ListView](#ListView)
* [Button](#Button)
* [SearchBar](#SearchBar)
* [PopMenuBox](#PopMenuBox)
* [LoadingPlaceholder](#LoadingPlaceholder)
* [ActionSheet](#ActionSheet)
* [Alert](#Alert)
* [Dialog](#Dialog)
* [Loading](#Loading)
* [Success](#Success)
* [Fail](#Fail)
* [TimePickerBox](#TimePickerBox)
* [FilterBar](#FilterBar)

<span id="Form"></span>
## Form
<img src="./docs/Form.png" width="30%"/>
```javascript
import { Form } from 'react-native-wxui';
class extends Component {
  ...
  _handleChange = (formData, fieldRef) => {
        //formData: {
        //  ref: value
        //}
        console.log('FormData: ', formData);
        console.log(fieldRef + ' has changed');
  }
  ...
  render() {
    return (
            <ScrollView style={styles.container}>
                <Form.Form onFieldChange={this._handleChange}>
                    <Form.Separator label="Separator" />
                    <Form.InputField label="InputField" ref="InputField1"
                        placeholder="placeholder"
                        iconLeft={
                            <Image source={require('./icon.png')} style={styles.iconLeft} />
                        }
                    />
                </Form.Form>
             </ScrollView>
  }
}
```
more details can be found in Example
