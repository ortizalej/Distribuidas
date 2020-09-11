import React from 'react';
import { StyleSheet} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Item,
    Label,
    Input,
    Body,
    Left,
    Right,
    Icon,
    Form,
    Text
  } from "native-base";

export default class Formulario extends React.Component {

    render() {
        if (this.props.type === 'Ingresos') {
            return ingresosScreen()
        }

    }

}

function ingresosScreen() {
    return (
        <Container style={styles.container}>

        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input secureTextEntry />
            </Item>
          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }}>
            <Text>Sign In</Text>
          </Button>
        </Content>
      </Container>
        
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        width:270

      }
});
