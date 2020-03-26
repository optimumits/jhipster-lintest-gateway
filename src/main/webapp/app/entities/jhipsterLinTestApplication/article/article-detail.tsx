import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './article.reducer';
import { IArticle } from 'app/shared/model/jhipsterLinTestApplication/article.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IArticleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ArticleDetail = (props: IArticleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { articleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterlintestgatewayApp.jhipsterLinTestApplicationArticle.detail.title">Article</Translate> [
          <b>{articleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="jhipsterlintestgatewayApp.jhipsterLinTestApplicationArticle.title">Title</Translate>
            </span>
          </dt>
          <dd>{articleEntity.title}</dd>
          <dt>
            <span id="tag">
              <Translate contentKey="jhipsterlintestgatewayApp.jhipsterLinTestApplicationArticle.tag">Tag</Translate>
            </span>
          </dt>
          <dd>{articleEntity.tag}</dd>
          <dt>
            <span id="num">
              <Translate contentKey="jhipsterlintestgatewayApp.jhipsterLinTestApplicationArticle.num">Num</Translate>
            </span>
          </dt>
          <dd>{articleEntity.num}</dd>
        </dl>
        <Button tag={Link} to="/article" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/article/${articleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ article }: IRootState) => ({
  articleEntity: article.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
