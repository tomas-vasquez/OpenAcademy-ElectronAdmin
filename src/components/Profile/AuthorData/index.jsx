import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";

// reactstrap components
import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  Button,
  Collapse,
  // Container,
} from "reactstrap";

import { nameChangedHandler } from "helpers/input";

import OptionCountries from "./OptionCountries";
import ProfileCard from "./ProfileCard";
import SingleField from "./SingleField";
import SingleSocialField from "./SingleSocialField";
import DescriptionField from "./DescriptionField";
import Alerts from "helpers/Alerts";
import Icons from "components/common/Icons";
import FirebaseContext from "context/FirebaseContext";

function AuthorData(props) {
  const { profile, user, handleProfileDataChanged } = props;
  const [editable, setEditable] = useState(false);

  const firebase = useContext(FirebaseContext);
  const firestore = firebase.firestore();

  const handleDataUpdate = (e) => {
    e.preventDefault();
    let data = {};

    const form = e.target;

    for (let index = 0; index < form.length; index++) {
      if (form[index].name) {
        data[form[index].name] = form[index].value;
      }
    }

    firestore
      .collection("profiles")
      .doc(user.id)
      .set({ ...profile, ...data })
      .then(() => {
        handleProfileDataChanged({ ...profile, ...data });
        Alerts.showToast("perfil Actualizado");
      });
    Alerts.showLoading();
  };

  useEffect(() => {
    if (user) {
      if (user.id === profile.id) {
        setEditable(true);
      }
    }
  });

  return (
    <div>
      <>
        <ProfileCard
          profile={profile}
          editable={editable}
          handleProfileDataChanged={handleProfileDataChanged}
        />

        <Card className="shadow-md mb-4">
          <CardHeader className="py-2 px-3">
            <CardTitle>
              <Icons icon="user" className="mr-2" />
              Datos del perfíl
            </CardTitle>
          </CardHeader>

          <CardBody>
            <form onSubmit={handleDataUpdate} id="form-user-data">
              <h5 className="heading-small text-muted mb-4">
                Información principal:
              </h5>

              <SingleField
                disabled
                label="Nombre de cuenta"
                defaultValue={`@${profile.user_name}`}
                isEditing={editable}
              />
              <SingleField
                disabled
                label="Correo electronico"
                defaultValue={profile.email}
                isEditing={editable}
              />
              <SingleField
                name="name"
                label="Nombre completo"
                defaultValue={profile.name}
                isEditing={editable}
                onChange={nameChangedHandler}
              />

              <hr className="my-4" />
              <h5 className="heading-small text-muted mb-4">Redes Sociales:</h5>
              {/* 
              <OptionCountries
                editing={editable}
                parent_reference={this}
                whatsapp_number={profile.whatsapp_number}
                whatsapp_code_area={profile.whatsapp_code_area}
              /> */}

              <SingleSocialField
                name="facebook"
                defaultValue={profile.link_facebook}
                isEditing={editable}
              />
              <SingleSocialField
                name="twitter"
                defaultValue={profile.link_twitter}
                isEditing={editable}
              />
              <SingleSocialField
                name="instagram"
                defaultValue={profile.link_instagram}
                isEditing={editable}
              />

              <DescriptionField
                defaultValue={profile.description}
                defaultValue2={profile.short_description}
                isEditing={editable}
              />

              <Collapse isOpen={editable}>
                <div className="text-center">
                  <Button type="submit" className="my0" color="primary">
                    Guardar cambios <i className="fa fa-save mr-2"></i>
                  </Button>
                </div>
              </Collapse>
            </form>
          </CardBody>
        </Card>
      </>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.settings.user,
  };
};

export default connect(mapStateToProps)(AuthorData);
