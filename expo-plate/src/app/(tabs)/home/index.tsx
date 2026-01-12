import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { Card, Avatar, Skeleton, Button, useToast } from 'heroui-native';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2500);
  };

  return (
    <ScreenScrollView>
      <View className="mt-2 gap-4">
        <Card className="p-4">
          <Card.Header className="flex-row items-center gap-3">
            <Skeleton isLoading={isLoading} className="rounded-full w-16 h-16">
              <Avatar size="lg" color="accent" alt="John Doe">
                <Avatar.Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=32' }}
                />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
            </Skeleton>

            <View className="flex-1 gap-1">
              <Skeleton isLoading={isLoading} className="h-5 w-32 rounded-md">
                <Card.Title>John Doe</Card.Title>
              </Skeleton>
              <Skeleton isLoading={isLoading} className="h-4 w-40 rounded-md">
                <Card.Description>Software Engineer</Card.Description>
              </Skeleton>
            </View>
          </Card.Header>

          <Card.Body className="mt-4 gap-2">
            <Skeleton isLoading={isLoading} className="h-4 w-full rounded-md">
              <Card.Description>
                Building amazing mobile experiences with React Native and Expo.
              </Card.Description>
            </Skeleton>
            <Skeleton isLoading={isLoading} className="h-4 w-3/4 rounded-md">
              <Card.Description>
                Open source contributor and tech enthusiast.
              </Card.Description>
            </Skeleton>
          </Card.Body>

          <Card.Footer className="mt-4 flex-row gap-3">
            <Skeleton isLoading={isLoading} className="h-10 flex-1 rounded-lg">
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
            </Skeleton>
            <Skeleton isLoading={isLoading} className="h-10 flex-1 rounded-lg">
              <Button variant="tertiary" className="flex-1">
                <Button.Label>Message</Button.Label>
              </Button>
            </Skeleton>
          </Card.Footer>
        </Card>

        {/* Stats Card */}
        <Card className="p-4">
          <Card.Header>
            <Skeleton isLoading={isLoading} className="h-5 w-24 rounded-md">
              <Card.Title>Statistics</Card.Title>
            </Skeleton>
          </Card.Header>

          <Card.Body className="mt-3 flex-row justify-around">
            <View className="items-center gap-1">
              <Skeleton isLoading={isLoading} className="h-6 w-12 rounded-md">
                <Card.Title className="text-lg">128</Card.Title>
              </Skeleton>
              <Skeleton isLoading={isLoading} className="h-4 w-14 rounded-md">
                <Card.Description>Posts</Card.Description>
              </Skeleton>
            </View>

            <View className="items-center gap-1">
              <Skeleton isLoading={isLoading} className="h-6 w-12 rounded-md">
                <Card.Title className="text-lg">2.4K</Card.Title>
              </Skeleton>
              <Skeleton isLoading={isLoading} className="h-4 w-16 rounded-md">
                <Card.Description>Followers</Card.Description>
              </Skeleton>
            </View>

            <View className="items-center gap-1">
              <Skeleton isLoading={isLoading} className="h-6 w-12 rounded-md">
                <Card.Title className="text-lg">891</Card.Title>
              </Skeleton>
              <Skeleton isLoading={isLoading} className="h-4 w-16 rounded-md">
                <Card.Description>Following</Card.Description>
              </Skeleton>
            </View>
          </Card.Body>
        </Card>

        {/* Reload Button */}
        <Button onPress={handleReload} variant="secondary">
          <Button.Label>Reload Skeleton Demo</Button.Label>
        </Button>


      </View>
    </ScreenScrollView>
  );
}
