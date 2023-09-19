"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const WelcomeDialog = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Welcome to Bill Navi!
              </ModalHeader>
              <ModalBody>
                <p>
                  Thank you for taking the time to visit my app! This is a early
                  beta version of a project that has been in my head for years.
                </p>
                <p>
                  This Bill Navigator is a tool to help you find and track bills
                  currently working their way through the United States
                  Congress. The vanilla homepage will by default show you the
                  twenty most recent bills to have either been introduced or had
                  some major action taken, such as passing the house/senate.
                  Clicking on the bill title will bring you to a more in-depth
                  details page and clicking on the name of the sponsor will
                  bring you to a member detail page.
                </p>
                <p>
                  As development progresses the data will get more and more
                  granular. I am always searching for data sources to improve
                  the usefulness of the app. Right now the bulk of the data
                  comes from ProPublica and Congress.gov. I strongly encourage
                  you to visit and support Propublica as they are doing amazing
                  and important work when it comes to government accountability
                  and transparency. Also, credit should be given to the team
                  that works on the Congress.gov API, they provide some great
                  tools and good documentation.
                </p>
                <p>
                  {" "}
                  If you are hiring or would like to learn more about the
                  project, please feel free to click <em>here</em> or on the
                  "About" link on the search bar. I promise a footer is coming
                  soon!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default WelcomeDialog;
