import {
  FlatList,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from 'components/General/ScreenWrapper';
import OwnerService from 'services/OwnerService';
import HandleErrors from 'hooks/handleErrors';
import ButtonComponent from 'components/General/ButtonComponent';
import COLORS from 'constants/Colors';
import OwnerNewEditModal from 'components/OwnersComponents/OwnerNewEditModal';
import OwnerCard from 'components/OwnersComponents/OwnerCard';

export default function EditOwners() {
  const [owners, setOwners] = useState(null);
  const getOwners = () => {
    OwnerService.getAll()
      .then((res) => {
        setOwners(res);
      })
      .catch((err) => HandleErrors(err));
  };
  useEffect(() => {
    getOwners();
  }, []);

  const [isNewControlModalVisible, setIsNewControlModalVisible] = useState(false);
  const showOwnersControlModal = () => {
    setIsNewControlModalVisible(true);
  };

  const onDeleteOwnerHandler = (id) => {
    console.log(id);
  };

  const onEditOwnerhandler = (id) => {
    console.log(id);
  };

  return (
    <ScreenWrapper spaceBetween>
      <View>
        <FlatList
          data={owners}
          keyExtractor={(item) => item?.id}
          renderItem={({ item, index }) => (
            <OwnerCard
              name={item?.name}
              color={item?.color}
              index={index + 1}
              onDeleteButtonClicked={() => onDeleteOwnerHandler(item?.id)}
              onEditButtonClicked={() => onEditOwnerhandler(item?.id)}
            />
          )}
        />
      </View>

      <ButtonComponent
        title="Add New Owner"
        backgroundColor={COLORS.primary}
        onPress={showOwnersControlModal}
      />
      <OwnerNewEditModal
        isModalVisible={isNewControlModalVisible}
        setIsModalVisible={setIsNewControlModalVisible}
        onSubmitListner={() => getOwners()}
      />
    </ScreenWrapper>
  );
}
