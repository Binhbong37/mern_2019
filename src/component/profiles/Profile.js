import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getAllProfile } from '../../actions/profile';
const Profile = ({ getAllProfile, profile: { profiles, loading } }) => {
    useEffect(() => {
        getAllProfile();
    }, [getAllProfile]);
    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className="large text-primary">Developer</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i> Browse and
                        connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.map((profile) => (
                                <ProfileItem
                                    key={profile._id}
                                    profile={profile}
                                />
                            ))
                        ) : (
                            <h4>No profiles found . . .</h4>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getAllProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    };
};

export default connect(mapStateToProps, { getAllProfile })(Profile);
