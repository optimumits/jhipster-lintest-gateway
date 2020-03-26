import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './article.reducer';
import { IArticle } from 'app/shared/model/jhipsterLinTestApplication/article.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IArticleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ArticleUpdate = (props: IArticleUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { articleEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/article');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...articleEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterlintestgatewayApp.jhipsterLinTestApplicationArticle.home.createOrEditLabel">
            <Translate contentKey="jhipsterlintestgatewayApp.jhipsterLinTestApplicationArticle.home.createOrEditLabel">
              Create or edit a Article
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : articleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="article-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="article-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="article-title">
                  <Translate contentKey="jhipsterlintestgatewayApp.jhipsterLinTestApplicationArticle.title">Title</Translate>
                </Label>
                <AvField
                  id="article-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="tagLabel" for="article-tag">
                  <Translate contentKey="jhipsterlintestgatewayApp.jhipsterLinTestApplicationArticle.tag">Tag</Translate>
                </Label>
                <AvField
                  id="article-tag"
                  type="text"
                  name="tag"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 3, errorMessage: translate('entity.validation.minlength', { min: 3 }) },
                    maxLength: { value: 3, errorMessage: translate('entity.validation.maxlength', { max: 3 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="numLabel" for="article-num">
                  <Translate contentKey="jhipsterlintestgatewayApp.jhipsterLinTestApplicationArticle.num">Num</Translate>
                </Label>
                <AvField id="article-num" type="string" className="form-control" name="num" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/article" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  articleEntity: storeState.article.entity,
  loading: storeState.article.loading,
  updating: storeState.article.updating,
  updateSuccess: storeState.article.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArticleUpdate);
