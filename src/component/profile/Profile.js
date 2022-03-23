import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExp from './ProfileExp';
import ProfileEducation from './ProfileEducation';
import { Link } from 'react-router-dom';

const Profile = ({
    match,
    getProfileById,
    profile: { loading, profile },
    auth,
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);
    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.user._id && (
                            <Link to="/edit-profile" className="btn btn-dark">
                                Edit Profile
                            </Link>
                        )}
                    <div class="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div class="profile-exp bg-white p-2">
                            <h2 class="text-primary">Experience</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map((exp) => {
                                        return (
                                            <ProfileExp
                                                key={exp._id}
                                                experience={exp}
                                            />
                                        );
                                    })}
                                </Fragment>
                            ) : (
                                <h4>No exp is credentials</h4>
                            )}
                        </div>
                        <div class="profile-edu bg-white p-2">
                            <h2 class="text-primary">Education</h2>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                    {profile.education.map((edu) => {
                                        return (
                                            <ProfileEducation
                                                key={edu._id}
                                                education={edu}
                                            />
                                        );
                                    })}
                                </Fragment>
                            ) : (
                                <h4>No exp is credentials</h4>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { getProfileById })(Profile);
