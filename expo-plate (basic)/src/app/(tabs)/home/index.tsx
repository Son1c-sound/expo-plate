import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { Card, Avatar, Button, useToast, useThemeColor } from 'heroui-native';
import { useRevenueCat } from '../../../contexts/revenuecat-context';


export default function App() {
  const { toast } = useToast();
  const { isProUser, presentPaywall } = useRevenueCat();
  const [foregroundColor] = useThemeColor(['foreground']);

  return (
    <ScreenScrollView>
      <View className="mt-2 gap-4">
        <Card className="p-4">
          <Card.Header className="flex-row items-center gap-3">
            <Avatar size="lg" color="accent" alt="John Doe">
              <Avatar.Image
                source={{ uri: 'https://i.pravatar.cc/150?img=32' }}
              />
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>

            <View className="flex-1 gap-1">
              <Card.Title>John Doe</Card.Title>
              <Card.Description>Software Engineer</Card.Description>
            </View>
          </Card.Header>

          <Card.Body className="mt-4 gap-2">
            <Card.Description>
              Building amazing mobile experiences with React Native and Expo.
            </Card.Description>
            <Card.Description>
              Open source contributor and tech enthusiast.
            </Card.Description>
          </Card.Body>

          <Card.Footer className="mt-4 flex-row gap-3">
            <Button
              variant="primary"
              className="flex-1"
              onPress={() => {
                toast.show({
                  label: 'Following',
                  description: 'You are now following John Doe',
                  variant: 'success',
                });
              }}
            >
              <Button.Label>Follow</Button.Label>
            </Button>
            <Button variant="tertiary" className="flex-1">
              <Button.Label>Message</Button.Label>
            </Button>
          </Card.Footer>
        </Card>

   
        <Card className="p-4">
          <Card.Header>
            <Card.Title>Statistics</Card.Title>
          </Card.Header>

          {isProUser ? (
            <Card.Body className="mt-3 flex-row justify-around">
              <View className="items-center gap-1">
                <Card.Title className="text-lg">128</Card.Title>
                <Card.Description>Posts</Card.Description>
              </View>

              <View className="items-center gap-1">
                <Card.Title className="text-lg">2.4K</Card.Title>
                <Card.Description>Followers</Card.Description>
              </View>

              <View className="items-center gap-1">
                <Card.Title className="text-lg">891</Card.Title>
                <Card.Description>Following</Card.Description>
              </View>
            </Card.Body>
          ) : (
            <Card.Body className="mt-4 items-center gap-3">
              <Ionicons name="lock-closed" size={32} color={foregroundColor} />
              <Card.Description className="text-center">
                This feature is gated
              </Card.Description>
              <Button variant="primary" onPress={presentPaywall}>
                <Button.Label>Unlock Feature</Button.Label>
              </Button>
            </Card.Body>
          )}
        </Card>
      </View>
    </ScreenScrollView>
  );
}
