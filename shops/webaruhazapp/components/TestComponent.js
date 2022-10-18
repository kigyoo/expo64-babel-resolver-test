import { Center, Image, Stack, Text } from 'native-base';
import React from 'react';

const TestComponent = props => {
    return <Stack flex={1} p={1} bg='trueGray.200'>
        <Text>Test component module-resolver different content.</Text>
        <Center mt={10} bg='white'>
            <Image
                resizeMode='contain'
                style={{ width: '80%' }}
                source={require('assets/logo.png')}
                alt={""}
            />
        </Center>
    </Stack>
}

export default TestComponent;